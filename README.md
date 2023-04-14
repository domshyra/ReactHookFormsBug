# ReactHookFormsBug
This is a strange usecase where local dev works but when the app is build for production the bug will occur. 


# Running 
navigate to the web folder ie `cd web`

use `npm i` then run `npm start`

to run in production build use `npm run build` then follow [these steps](https://create-react-app.dev/docs/deployment#static-server)

# Bug 
If you click 'show modal' and change a checkbox button, letter or numbered, it will not dirty the form on the first attempt when running a production build of react. 
This will behave correctly if running in development mode. 

The text field can change correctly, in addtion to the radio button. However the checkboxes do not behave the same. 

# Expected Behavior 
once the user clicks a checkbox the save button should be enabled since the form state is now dirty
![ezgif com-optimize (1)](https://user-images.githubusercontent.com/1061957/232148517-9243bbc0-e40e-4c01-8048-4d424a8f6eab.gif)


# Actual Behavior 
It takes two clicks for a checkbox to set the form state to dirty when build with production. After the second click it will behave as normal. But on first time it doesn't work. Hard refresh after opening to get the behavior to repeat again. Seems fine after the first check and un check but will not work the very first time. 
![ezgif com-optimize](https://user-images.githubusercontent.com/1061957/232148533-be8ce924-ed78-4b49-8735-33d6207a1081.gif)
