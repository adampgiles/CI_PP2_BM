# Beat Maker - Drum Sequencer

**Developer: Adam Giles**

[Live website](https://adampgiles.github.io/CI_PP2_BM/)

## Table of Content

- [Project Goals](#project-goals)

## Project Goals
Beat Maker is an interactive online drum sequencer. Featuring 6 tracks, 4 kits, 10 preset loops, adjustable tempo and import/export features to share your creations.

Beat Maker has the following goals;
- Give users a platform to create short music loops.
- Give users a platform to share their Beat Maker creations.

Users of Beat Maker have the following goals;
- To learn how to use Beat Maker features.
- To create music loops.
- To create music loop using different kits.
- To create music loops at different tempos.
- To export their Beat Maker music loops, to share with other users.
- To import other user's Beat Maker music loops, to listen to, or modify.

## User Experience

### Target Audience
- Individuals interested in music creation.
- Individuals interested in sharing musical creations.

### User Stories
User stories have been seperated into two groups; Site Users and Site Owner. 

#### Site Users
1. I would like to create a music loop by interacting with a drum sequencer.
2. I would like to hear the loop playing while continuing to change the loop.
3. I would like to change the drum sounds to create different genre loops.
4. I would like to export or import loop data to colaborate with other users.
5. I would like to submit my loop to the site owner to be added to the loop presets.
6. I would like to have access to quick guide information to understand how to use the drum sequencer.

#### Site Owner
1. I would like users to be able to interact with the website to create music loops.
2. I would like users to receive feedback when interacting with site buttons, by changing the button colour when clicked.
3. I would like the user to be notified when the tempo of the loop has been updated.
4. I would like the website to be responsive, so I can be accessed via mobile, tablet and desktop.
5. I would like the website to have a loop submission form with validation implemented so the form cannot be submitted blank or with invalid values.

## Design

### Colour
The site's colour scheme consists of five key colours; White, black, yellow, teal and light-blue. White is used for buttons and input fields. Black is used for text and icons. Yellow is used for the background and the Quick Guide text-boxes. Light-blue is used for clicked buttons.

### Font

One font was used on the site; Signika Negative, which is a clear and legible font.

### Structure

The website structure consists of a main page and 404 page. The main page has a persistent media control section at the top of the page and a section below consisting of three windows. Only one window is visable at a time and can be changed using tabs at the top of this section. 

The sections and windows are detailed below;

- The Media Control contains a "Play/Stop" button, Tempo number input and Kit Selection dropdown.

(Media Control screenshot here)

- The first window contains the Track section. This section contains six tracks. Each track consists of a Drum Pad, mute button, clear button and a 16 step drum sequencer.

(Track Section screenshot to be added here)

- The second window contains the Presets and Share section. This section contains Preset selection instructions and a dropdown, Export and Import instruction, text input box and Export and Import buttons. When viewing this window a section shows below. This section contains text and a button inviting the user to submit thier loop to be added to the presets. Clicking the button opens the Submission Window.

(Preset/Share Section screenshot to be added here)

- The Submission Window contains a form with instructions. The form has text inputs for "Name", "Email Address" and "Loop Title", and a button to submit the form. There is also a text alert box below the button, which displays a message after clicking the button. This message changes based on the validity of the input and the current stage during loop submission. The form uses EmailJS, which is detailed further in a section below.

(Submission Window screenshot to be added here)

- The third window contains the Information section. This section contains a Quick Guide, Credits and a copyright notice. The Quick Guide gives the user an overview of the drum sequencer features.

(Information Section screenshot to be added here)

A 404 page was created to ensure that a user can easily navigate back to the Beat Maker site if they encounter a page which does not exist.

(404 page screenshot to be added here)

### Languages

- HTML
- CSS
- Javascript

### Frameworks, Libraries & Tools

- [Am I Responsive](http://ami.responsivedesign.is/), used to create a devices mock-up image. 
- [Balsamiq](https://balsamiq.com/), used to create wireframes.
- [Favicon.io](https://favicon.io), used to create the site favicon.
- [Font Awesome](https://fontawesome.com/), used for all site icons.
- [Git](https://git-scm.com/), used for version control within VSCode to push the code to GitHub.
- [GitHub](https://github.com/), used to store project code.
- [Google Fonts](https://fonts.google.com/), used to acquire the site's fonts.
- [WC3 Validator](https://validator.w3.org/), [Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/), [Wave Validator](https://wave.webaim.org/), [Lighthouse](https://developers.google.com/web/tools/lighthouse/) and [Am I Responsive](http://ami.responsivedesign.is/), used to test the site's code, performance, accessibilty and responsiveness. 

## Features

The website consists of six sections with thirteen features.

### Media Controls
- Situated in a persistant position at the top of the page.
- Contains the playback button, tempo control and kit selection.
- The playback button can be clicked to Play or Stop the loop playback.
- The Tempo control consists of a number input and refresh button. The number input changes the tempo value, which is in beats per minute. The tempo can then be updated by clicking the refresh button. The tempo value is limited between 60 and 200. A tootip shows this range when entering a value and when clicking refresh, the tooltip shows that the tempo has been updated.
- The Kit selection area consists of a dropdown with 4 options. These 4 options change the drum sounds on each of the drum sequencer tracks. Selecting an option immediately updates the sounds.

### Tab Navigation
- Situated below the Media Control.
- Contains three tabs for each of the three windows.
- When clicked the tabs change the window.
- The first tab (Sequencer), shows the sequencer window.
- The second tab (Presets/Share), shows the presets and share window.
- The third tab (Information), shows the information window.
- When a tab is clicked, the other tab's background colours change to a darker colour. This is to show that the tab's window is not active. Only in-active tabs will change the window, clicking an active tab has no effect.

### Sequencer
- Situated below the Tab Navigation section, connected to the first tab.
- Contains six drum tracks
- Each of the six tracks consists of a Drum Pad, Mute button, Clear button and a 16 Step Sequencer.
- The Drum pad plays an audio sample of the track's sound when clicked. The pad's colour changes temporarily when clicked to give visual feedback to the user, informing them that the button was clicked.
- The Mute button will mute the track and stop the track's audio from playing during playback. The button's colour changes to visually inform the user that the mute button is active.
- The clear button toggles off any active steps in the track's step sequencer. The button's colour changes temporarily to privide visual feedback to the user that the change has occured.
- The 16 Step Sequencers consists of 16 buttons. When a button is clicked the colour changes to provide visual feedback that the step is active. During playback, when the playback position reaches the step's position, if the step is active the track's sound will trigger.
- Each track's step has a different colour. This is to clearly show the different tracks and also to provide variety to the visuals.

### Preset/Share Section
- Situated below the Tab Navigation section, connected to the second tab.
- Contains three sub-sections; Preset Loops, Sharing Loops and Submit for Review.
- The Preset Loops sub-section consists of a Heading, paragraph with short instructions, a dropdown and a refresh button. The dropdown contains a list of Premade Loops, the user can select a loop then click the refresh button to load the loop into the Sequencer. The window will then automatically change to the sequencer window, populate the sequencer and the media control. This change provides visual feedback to the user that the change has occured.
- The Sharing Loops sub-sections consists of a Heading, paragraph with instructions, a text input-box, a button to Export Loop and a button to Import Loop. When clicking the Export Loop button, the text input-box is populated with a Loop Data text string which has been compliled using Javascript. The user can then copy this text and share it with other users. The other users can then paste the Loop Data in the text input-box on thier session of the site and click the Import Button. The Loop Data will then be decompiled and loaded to the sequencer. Both buttons when clicked, temporarily chance colour to visually notify the user that it has been clicked.
- The Submit for Review sub-section consists of a Heading and a button. The button when clicked, opens up a Submission Window. This window is detailed further in the section below.

### Submission Window
- This window displays after clicking the "Submit Loop for Review" button on the Preset/Share window.
- Consists of a close button, a section containing a Heading and paragraph with instructions, and a section containing a form with a button, and an alert text box.
- The close button when clicked hides the sumbission window.
- The form consists of three text input fields and a button. The text inputs are for; Name, Email Address, and Your Loop Title. The button when clicked will submit the form.
- The form contains validation and will not submit if any of the fields are empty, and if the email address is not a valid email. The alert textbox will show below the button after clicking.
- The button can display four different messages;
1."Please enter details in all three text boxes"
2."Please enter a valid Email Address"
3."Please wait, sending details..."
4."Loop Data successfully sent for review!"
- Messages 1 and 2 display when trying to submit invalid inputs. Messages 3 and 4 display when submitting valid inputs.
- When submitting the form also submits the exported Loop Data.
- All form data is submitted through EmailJS and an email is sent to the site owner. This is detailed further in a section below.

### Information Window
- Situated below the Tab Navigation section, connected to the third tab.
- Contains two sub-sections; Quick Guide, and Credits/Copyright Notice.
- The Quick Guide sub-section consists of a heading, sub-headings, text boxes and images.
- There are two images (Media control, and Track Section), each with text boxes above with arrows directed towards sections of the image. The text boxes contain information on the sections function.
- The Credits/Copyright sub-section consists of a heading and information on credits, and a copyright notice.

### 404 Page
- Page is display when a user encounter a page that does not exist (HTTP 404 response code).
- User provided with a link to return to the main site