# WordPress powered site setup
Starting point for WordPress powered websites using the latest versions of WordPress, a fork of @johnburns87's Down to the Bones theme and a WordPress ready version of my frontend boilerplate.
1. Create an empty git repository
2. Add a default remote if necessary (usually called origin, on github)
3. `git remote add -f frontend git@github.com:derekjohnson/wp-boilerplate-frontend.git`
4. `git merge frontend/master`
5. `git remote add -f wordpress git@github.com:WordPress/WordPress.git`
6. `git merge wordpress/master`
7. `cd wp-content/themes/`
8. `git init`
9. `git remote add -f theme git@github.com:derekjohnson/wordpress-theme-boilerplate.git`
10. `git merge theme/master`
11. Delete all themes except down-to-the-bones
12. `rm -rf .git/`
13. Rename down-to-the-bones to new theme name
14. `cd` to the project root
15. Replace every instance of `THEME_NAME` in Gruntfile.js with the new theme name
16. `npm install`
17. `grunt`
18. `git add .`
19. `git commit -am "first commit"`
20. `git push -u origin master`