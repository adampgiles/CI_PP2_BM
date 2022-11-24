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