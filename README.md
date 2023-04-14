# ReactHookFormsBug
Test for possible react hook form bug


# Running 
navigate to the web folder ie `cd web`
use `npm i` then run `npm start`

to run in production build use `npm run build` then follow [these steps](https://create-react-app.dev/docs/deployment#static-server)

# Bug 
If you click 'show modal' and change a checkbox button, letter or numbered, it will not dirty the form on the first attempt when running a production build of react. 
This will behave correctly if running in development mode. 

The text field can change and word correctly, in addtion to the radio button. However the checkboxes do not behave the same. 

# Expected Behavior 
//TODO

# Actual Behavior 
//TODO 
