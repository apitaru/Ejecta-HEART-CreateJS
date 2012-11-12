#Ejecta-HEART-CreateJS

**Imagine being able to develop your JavaScript CreateJS project in the browser, then drag it into XCode, hit 'play', and have it run on the iOS device in fast native code. We get the speedy prototyping of a JavaScript stack, with the sturdy performance of a native Objective-C app.**

##Background

[CreateJS](http://www.createjs.com) is a suite of modular libraries and tools which work together to enable rich interactive content on open web technologies via HTML5. These libraries are designed to work completely independently, or mixed and matched to suit your needs. The CreateJS Suite is comprised of: EaselJS, TweenJS, SoundJS, PreloadJS, and Zoë.

So far Ejecta-HEART-CreateJS is implementing EaselJS and the TweenJS libraries, with more to follow. [EaselJS](http://www.createjs.com/#!/EaselJS) is a JavaScript library to make working with the Canvas element easier. It provides a display list to allow you to work with display elements on a canvas as nested objects. It also provides a simple framework for providing shape based mouse interactions on elements in the display list. This is useful for games, generative art, and other highly graphical experiences.

[Ejecta](http://impactjs.com/ejecta) is a Fast, Open Source JavaScript, Canvas & Audio Implementation for iOS. JavaScript code is executed directly by a JavaScript VM (JavaScriptCore), the HTML5 Canvas API is implemented in native code with OpenGL, Audio is implemented with OpenAL. Several other APIs (touch, accelerometer, localStorage) behave like those in a real browser.

Ejecta was intended to work seamlessly with the [ImpactJS](http://impactjs.com) game library, both developed by Dominic Szablewski from Phobos Labs. Dominic was gracious enough to open-source Ejecta, allowing other JavaScript libraries to take advantage of his great work.

**This project strives to allow CreateJS projects to be used with Ejecta.** This is done by loading up a patch file (in libs/pitaru/ejecta-heart-createjs.js) that injects changes to both libraries (mostly EaselJS). This is an ongoing project, very much in alpha stages. I'd say that about 70% of EaselJS works seamlessly. It's my hope that more developers will notice the great potential in this combination and join me in hashing out the remaining 30%.

Here's a quick overview of the project's folders and files: 
|- libs .. The ejecta-heart-createjs patch file, as well as other createJS code for convinience. 
|- App   .. Your app folder. By default I've incuded many of the examples from the EaselJS github repo.
  |- index.js .. the main (default) project file that Ejecta executes (think of it as the index.html equivalent)
  |- assets .. images and other assets that the createJS examples require.
  |- src  .. where all of your source code sits. At the moment it has the example files that come with EaselJS
     |- works .. EaselJS examples that work similarly in the browser and on the iOS device.
     |- partial .. EaselJS examples that only work partially due to a non-crucial missing feature or other incompatibility. 
     |- fail 	.. EaselJS examples that won't load due to a crucial missing feature or other incompatibility.


## Requirements and Installation Steps

1. You'll need a Mac, and you'll need to install the latest [XCode](https://developer.apple.com/xcode/) (version 4.5 or later). Notice that if you'd like to run the project on your iPhone/iPad, you'll also need to get a [developers licensee](https://developer.apple.com/) from Apple to the tune of $100 per year. Otherwise you'll still be able to test it on XCode's simulator (only half the fun).

2. Download the Ejecta XCode project. The project is very active with important patches added weekly, so I recommend [cloning the latest version via github](https://github.com/phoboslab/Ejecta) and pulling often. 

  Re. CreateJS - this repo includes a minified version of EasleJS for convenience, as well as TweenJS and a few other dependant files. I'll try to keep it up to date. You can also clone the [EaselJS and CreateJS github repo](https://github.com/CreateJS/EaselJS) and use their source instead (just copy any files you need into the libs/easeljs directory of this project)

3. Clone this project (or download the zipped version from the button above)

4. Head into the Ejecta folder (from step 2) and double click the Ejecta.xcodeproj file. This should open up XCode.

5. Bringing it all together: 
  - Your xcode project might show a red 'App' folder alongside your new blue one. Right click on the red App folder and delete it.
  - In XCode's top menu, choose File->Add Files to Ejecta.
  - **Be sure that in the Finder window that opens up, the "Create Folder References for any added folders" is selected.**
  - Be sure that 'Copy Items to destinations group folder' is **not** selected
  - Finally, Navigate to the App folder of this project and select it. This should have created a blue folder called "App" in the left file-menu in XCode. 
  - Follow the same steps above to include the "libs" folder as well.
 

6. Select the simulator (or your provisioned device) and hit the Play button. If all works well, the initial HelloWorld EaselJS example should load up. 

## Viewing the various easelJS examples, and writing your own: 

As a measurement of compatibility between EaselJS and Ejecta, I've included many of the default example files that EaselJS comes with. You can find them all in the App/src folder. Examples that are either partially or totally not working are separated into their own folders respectively. 

To try them all out, head into App/index.js - it's basically the main file that Ejecta executes (think of it as the index.html equivalent). Simply comment out the HelloWorld.js project and uncomment the project you'd like to run.

** Be sure to always Command-S (save) the changes before building the project. XCode can be finicky with caching your code. To ensure you're running the latest saved file, you can also Shift-Command-K to clean the project source files. Once a day, I also recommend clearing the simulator cache (Go to its menu and choose "iOS Simulator -> Reset Content an dSettings"). If you're testing the project on the device, you can delete the App icon in order to truly clear cached files. Again - highly recommended to do this once a day. 

## License
This code is licensed under the [MIT Open Source License](http://opensource.org/licenses/mit-license.php)
Ejecta and EaselJS have their own licenses - please check them out.

~~~