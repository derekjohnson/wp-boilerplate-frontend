module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {htmlbuild: 'grunt-html-build'});

	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// watch
		watch: {
			html: {
				files: 'src/**/*.html',
				tasks: ['htmlbuild'],
				option: {
					interrupt: true
				}
			},

			css: {
				files: 'src/sass/*.scss',
				tasks: ['sass','csso:compress'],
				options: {
					interrupt: true
				}
			},

			js: {
				files: 'src/js/*.js',
				tasks: ['uglify'],
				options: {
					interrupt: true
				}
			},

			// Separate copy tasks instead of something like
			// tasks: ['sass', 'copy:css'] in the css watch task
			// as it's much faster
			wp_css: {
				files: 'dist/css/*.css',
				tasks: ['copy:css']
			},

			wp_js: {
				files: 'dist/js/*.js',
				tasks: ['copy:js']
			}
		},

		// tasks
		htmlbuild: {
			prod: {
				src: 'src/*.html',

				dest: 'dist/',

				options: {
					beautify: false,
					sections: {
						head1: 'src/parts/head1.part.html',
						head2: 'src/parts/head2.part.html',
						header: 'src/parts/header.part.html',
						footer: 'src/parts/footer.part.html'
					},

					styles: {
						critical_home: 'src/parts/critical-home.css'
					}
				}
			}
		},

		sass: {
			prod: {
				options: {
					style: 'compressed',
					//noCache: true
				},

				files: {
					'dist/css/style.css': 'src/sass/style.scss',
					'dist/css/old-ie.css': 'src/sass/old-ie.scss',
					'dist/css/really-old-ie.css': 'src/sass/really-old-ie.scss'
				}
			}
		},

		criticalcss: {
			tpl_home: {
				options: {
					//forceInclude: [],
					url: "127.0.0.1:4000",
					width: 1200,
					height: 900,
					outputfile: "src/parts/critical-home.css",
					filename: "dist/css/style.css",
					buffer: 800*1024
				}
			}
		},

		csso: {
			compress: {
				options: {
					report: 'gzip'
				},

				files: {
					'dist/css/style.css': ['dist/css/style.css']
				}
			},

			compress_critical: {
				options: {
					report: 'gzip'
				},

				files: {
					'src/parts/critical-home.css': ['src/parts/critical-home.css']
				}
			}
		},

		csslint: {
			prod: {
				options: {
					'import': 2,
					'empty-rules': 2,
					'compatible-vendor-prefixes': false,
					'box-sizing': false
				},

				src: ['css/style.css']
			}
		},

		uglify: {
			prod: {
				options: {
					preserveComments: false
				},

				files: {
					'dist/js/script.min.js': ['src/js/main.js','src/js/fonts.js']
				}
			}
		},

		jshint: {
			prod: ['Gruntfile.js']
		},

		svgmin: {
			prod: {
				options: {
					plugins: [
						{
							removeViewBox: false
						}
					]
				},

				files: [
					{
						expand: true,
						cwd: 'src/assets/svg',
						src: '{,*/}*.svg',
						dest: 'dist/images/'
					},

					{
						expand: true,
						cwd: 'src/assets/icons',
						src: '{,*/}*.svg',
						dest: 'src/assets/icons'
					}
				]
			}
		},

		svg2png: {
			prod: {
				files: [
					{
						cwd: 'src/assets/svg/',
						src: ['**/*.svg'],
						dest: 'src/assets/png/'
					}
				]
			}
		},

		imageoptim: { // imageOptim, imageAlpha and jpegMini need to be installed. Also see https://www.npmjs.com/package/imageoptim-cli#jpegmini-and-support-for-assistive-devices for jpegMini to work
			prod: {
				options: {
					jpegMini: true,
					imageAlpha: true,
					quitAfter: true
				},

				src: ['src/assets/png']
			}
		},

		grunticon: {
			prod: {
				files: [{
					expand: true,
					cwd: 'src/assets/icons/',
					src: ['*.svg', '*.png'],
					dest: 'dist/css/icons/'
				}],

				options: {
					enhanceSVG: true
					/*customselectors: {
						"*": [".icon-$1:before"]
						// (this is going to be very useful)
					}*/
					
				}
			}
		},

		copy: {
			frontend_images: {
				expand: true,
				cwd: 'src/assets/',
				src: '**',
				dest: 'dist/images/',
				flatten: true,
				filter: 'isFile'
			},
			
			icons: {
				files: [{
					expand: true,
					cwd: 'dist/css/icons/',
					src: ['**'],
					dest: 'wp-content/themes/THEME_NAME/css/icons/'
				}]
			},

			images: {
				files: [{
					expand: true,
					cwd: 'dist/images/',
					src: ['**'],
					dest: 'wp-content/themes/THEME_NAME/images/'
				}]
			},

			css: {
				files: [{
					expand: true,
					cwd: 'dist/css/',
					src: ['*'],
					dest: 'wp-content/themes/THEME_NAME/css/',
					isFile: true
				}]
			},

			critical: {
				files: [{
					expand: true,
					cwd: 'src/parts/',
					src: ['*.css'],
					dest: 'wp-content/themes/THEME_NAME/fe-includes/'
				}]
			},

			js: {
				files: [{
					expand: true,
					cwd: 'dist/js',
					src: ['*'],
					dest: 'wp-content/themes/THEME_NAME/js',
					isFile: true
				}]
			},

			fonts: {
				files: [{
					expand: true,
					cwd: 'dist/fonts',
					src: ['*'],
					dest: 'wp-content/themes/THEME_NAME/fonts',
					isFile: true
				}]
			}
		},

		// Connect plugin for server and synchronisation between browsers/devices
		connect: {
			server: {
				options: {
					port: 9001,
					hostname: '0.0.0.0',
					base: 'dist',
					keepalive: true
				}
			}
		}
	});

	grunt.registerTask('default', ['htmlbuild','sass','uglify','csslint','jshint']);

	grunt.registerTask('critical', ['criticalcss','csso:compress_critical','copy:critical']);

	grunt.registerTask('img', ['svgmin','grunticon','svg2png','imageoptim','copy:icons','copy:images']);

	grunt.registerTask('server', ['connect:server']);
};
