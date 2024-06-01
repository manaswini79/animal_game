// import React, { useRef, useEffect } from 'react';
// import * as PIXI from 'pixi.js';
// import confetti from 'canvas-confetti';

// function Page4() {
//   const pixiContainerRef = useRef(null);

//   useEffect(() => {
//     const app = new PIXI.Application({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       backgroundColor: 0xdbcdf0,
//     });

//     pixiContainerRef.current.appendChild(app.view);

//     // app.loader.add('background', './images/back4.jpg');
//     app.loader.add('buttonTextureNext', '/images/next.png');
//     app.loader.add('buttonTexturePrev', '/images/replay.png');
//     app.loader.add('lambTexture', '/images/lamb.png');
//     app.loader.add('pigTexture', '/images/pig.png');
//     app.loader.load(setup);

//     function setup() {
//     //   const style = new PIXI.TextStyle({
//     //     fontFamily: 'Arial',
//     //     fontSize: 36,
//     //     fill: ['#ffffff', '#00ff99'],
//     //     stroke: '#4a1850',
//     //     strokeThickness: 5,
//     //     dropShadow: true,
//     //     dropShadowColor: '#000000',
//     //     dropShadowBlur: 4,
//     //     dropShadowAngle: Math.PI / 6,
//     //     dropShadowDistance: 6,
//     //     wordWrap: false,
//     //     lineJoin: 'round',
//     // //   });
//     // const background = new PIXI.Sprite(app.loader.resources['background'].texture);
//     // background.width = app.renderer.width;
//     // background.height = app.renderer.height;
    
//     //  // Apply blur filter
//     //  const blurFilter = new PIXI.filters.BlurFilter();
//     //  blurFilter.blur = 5; // Adjust the blur strength as needed
//     //  background.filters = [blurFilter];
     
//     //  // Adjust brightness by setting alpha and tint
//     // //  background.alpha = 0.8; // Make it less bright
//     // //  background.tint = 0xaaaaaa; // Apply a gray tint to dim the brightness

//     //  app.stage.addChild(background);

//     const style = new PIXI.TextStyle({
//         fontFamily: 'Arial',
//         fontSize: 36,
//         fontWeight: 'bold', // Added bold font weight
//         fill: '#000000', // Set text color to black
//         backgroundColor: '#00ff99', // Added background color
//         padding: 10, // Added padding for background
//         borderRadius: 50, // Added border radius for oval-like shape
//     });
    

    
//       const mytext = new PIXI.Text('The pig stood beside the lamb.', style);
//       mytext.x = app.renderer.width / 2;
//       mytext.y = app.renderer.height - 50;
//       mytext.anchor.set(0.5, 1);
//       app.stage.addChild(mytext);

//       const lamb = new PIXI.Sprite(app.loader.resources['lambTexture'].texture);
//       lamb.x = 900;
//       lamb.y = 300;
//       lamb.scale.set(0.45);
//       app.stage.addChild(lamb);

//       const pig = new PIXI.Sprite(app.loader.resources['pigTexture'].texture);
//       pig.interactive = true;
//       pig.buttonMode = true;
//       pig.anchor.set(0.5);
//       pig.scale.set(0.6);
//       pig.x = 400;
//       pig.y = 300;
//       app.stage.addChild(pig);

//       let successAchieved = false;

//       pig.on('pointerdown', onDragStart)
//         .on('pointerup', onDragEnd)
//         .on('pointerupoutside', onDragEnd)
//         .on('pointermove', onDragMove);

//       function onDragStart(event) {
//         if (!successAchieved) {
//           this.alpha = 0.5;
//           this.dragData = event.data;
//           this.dragging = true;
//         }
//       }

//       function onDragMove() {
//         if (this.dragging && !successAchieved) {
//           const newPosition = this.dragData.getLocalPosition(this.parent);
//           this.x = newPosition.x;
//           this.y = newPosition.y;

//           console.log(this.x)
//           console.log(this.y)
          
//           if (
//             newPosition.x >= 790 && newPosition.x <=820  &&
//             newPosition.y >= 440 &&
//             newPosition.y <= 470
//           ) {
//             if (!successAchieved) {
//               showSuccessMessage();
//               successAchieved = true;
//               this.dragging = false;
//               throwConfetti();
//             }
//           }
//         }
//       }
//       function throwConfetti() {
//         confetti({
//           particleCount: 100,
//           spread: 70,
//           origin: { y: 0.6 },
//         });
//       }

//       function onDragEnd() {
//         this.alpha = 1;
//         if (!successAchieved) {
//           this.dragging = false;
//         }
//       }

//       function showSuccessMessage() {
//         const successStyle = new PIXI.TextStyle({
//             fontFamily: 'Arial',
//             fontSize: 36,
//             fontWeight: 'bold', // Added bold font weight
//             fill: ['#ffffff'], // Changed to single color fill
//             backgroundColor: '#00ff99', // Added background color
//             padding: 10, // Added padding for background
//             borderRadius: 50, // Added border radius for oval-like shape
//         });
        
//         const message = new PIXI.Text('Success!', successStyle);
//         message.x = app.screen.width / 2;
//         message.y = app.screen.height / 2;
//         message.anchor.set(0.5);

//         app.stage.addChild(message);

//         setTimeout(showButtons, 1000);
//       }

//       function showButtons() {
//         const buttonNext = new PIXI.Sprite(app.loader.resources['buttonTextureNext'].texture);
//         const buttonPrev = new PIXI.Sprite(app.loader.resources['buttonTexturePrev'].texture);

//         buttonNext.x = app.renderer.width / 2 + 200;
//         buttonNext.y = app.renderer.height / 2;
//         buttonNext.anchor.set(0.5);
//         buttonNext.interactive = true;
//         buttonNext.buttonMode = true;

//         buttonPrev.x = app.renderer.width / 2 - 200;
//         buttonPrev.y = app.renderer.height / 2;
//         buttonPrev.anchor.set(0.5);
//         buttonPrev.interactive = true;
//         buttonPrev.buttonMode = true;

//         app.stage.addChild(buttonNext);
//         app.stage.addChild(buttonPrev);

//         buttonNext.on('pointerdown', onButtonNextClick);
//         buttonNext.on('pointerover', () => {
//           buttonNext.scale.set(0.4);
//         });
//         buttonNext.on('pointerout', () => {
//           buttonNext.scale.set(0.3);
//         });

//         buttonPrev.on('pointerdown', onButtonPrevClick);
//         buttonPrev.on('pointerover', () => {
//           buttonPrev.scale.set(0.3);
//         });
//         buttonPrev.on('pointerout', () => {
//           buttonPrev.scale.set(0.2);
//         });
//       }

//       function onButtonNextClick() {
//         console.log('Next button clicked');
//         window.location.href = '/page5'; // Navigate to the '/page2' route
//         // window.location.reload(); 
//     }
      
//       function onButtonPrevClick() {
//         console.log('previous button clicked');
//         window.location.reload(); // Reload the current page
//       }
//     }

//     return () => {
//       app.destroy(true, true);
//     };
//   }, []);

//   return <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }} />;
// }

// export default Page4;


import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import confetti from 'canvas-confetti';

function Page4() {
  const pixiContainerRef = useRef(null);
  const [trialCount, setTrialCount] = useState(0);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xdbcdf0,
    });

    pixiContainerRef.current.appendChild(app.view);

    app.loader.add('buttonTextureNext', '/images/next.png');
    app.loader.add('buttonTexturePrev', '/images/replay.png');
    app.loader.add('lambTexture', '/images/lamb.png');
    app.loader.add('pigTexture', '/images/pig.png');
    app.loader.load(setup);

    function setup() {
      const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#000000',
        backgroundColor: '#00ff99',
        padding: 10,
        borderRadius: 50,
      });

      const mytext = new PIXI.Text('The pig stood beside the lamb.', style);
      mytext.x = app.renderer.width / 2;
      mytext.y = app.renderer.height - 50;
      mytext.anchor.set(0.5, 1);
      app.stage.addChild(mytext);

      const lamb = new PIXI.Sprite(app.loader.resources['lambTexture'].texture);
      lamb.x = 900;
      lamb.y = 300;
      lamb.scale.set(0.45);
      app.stage.addChild(lamb);

      const pig = new PIXI.Sprite(app.loader.resources['pigTexture'].texture);
      pig.interactive = true;
      pig.buttonMode = true;
      pig.anchor.set(0.5);
      pig.scale.set(0.6);
      pig.x = 400;
      pig.y = 300;
      app.stage.addChild(pig);

      let successAchieved = false;

      pig.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

      function onDragStart(event) {
        if (!successAchieved) {
          this.alpha = 0.5;
          this.dragData = event.data;
          this.dragging = true;
        }
      }

      function onDragMove() {
        if (this.dragging && !successAchieved) {
          const newPosition = this.dragData.getLocalPosition(this.parent);
          this.x = newPosition.x;
          this.y = newPosition.y;

          if (
            newPosition.x >= 770 && newPosition.x <= 830 &&
            newPosition.y >= 420 &&
            newPosition.y <= 500
          ) {
            if (!successAchieved) {
              showSuccessMessage();
              successAchieved = true;
              this.dragging = false;
              throwConfetti();
            }
          }
        }
      }

      function throwConfetti() {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      function onDragEnd() {
        this.alpha = 1;
        if (!successAchieved) {
          this.dragging = false;
          setTrialCount(prevCount => prevCount + 1);
        }
      }

      function showSuccessMessage() {
        const successStyle = new PIXI.TextStyle({
          fontFamily: 'Arial',
          fontSize: 36,
          fontWeight: 'bold',
          fill: '#000000',
          backgroundColor: '#00ff99',
          padding: 10,
          borderRadius: 50,
        });

        const message = new PIXI.Text('Success!', successStyle);
        message.x = app.screen.width / 2;
        message.y = app.screen.height / 2;
        message.anchor.set(0.5);

        app.stage.addChild(message);

        setTimeout(showButtons, 1000);
      }

      function showButtons() {
        const buttonNext = new PIXI.Sprite(app.loader.resources['buttonTextureNext'].texture);
        const buttonPrev = new PIXI.Sprite(app.loader.resources['buttonTexturePrev'].texture);

        buttonNext.x = app.renderer.width / 2 + 200;
        buttonNext.y = app.renderer.height / 2;
        buttonNext.anchor.set(0.5);
        buttonNext.interactive = true;
        buttonNext.buttonMode = true;

        buttonPrev.x = app.renderer.width / 2 - 200;
        buttonPrev.y = app.renderer.height / 2;
        buttonPrev.anchor.set(0.5);
        buttonPrev.interactive = true;
        buttonPrev.buttonMode = true;

        app.stage.addChild(buttonNext);
        app.stage.addChild(buttonPrev);

        buttonNext.on('pointerdown', onButtonNextClick);
        buttonNext.on('pointerover', () => {
          buttonNext.scale.set(0.4);
        });
        buttonNext.on('pointerout', () => {
          buttonNext.scale.set(0.3);
        });

        buttonPrev.on('pointerdown', onButtonPrevClick);
        buttonPrev.on('pointerover', () => {
          buttonPrev.scale.set(0.3);
        });
        buttonPrev.on('pointerout', () => {
          buttonPrev.scale.set(0.2);
        });
      }

     
      function onButtonNextClick() {
        console.log('Next button clicked');
        window.location.href = '/page5'; 
      }

      function onButtonPrevClick() {
        console.log('Previous button clicked');
        window.location.reload(); 
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'Rocher', 
  fontSize: 30, 
  color: '#000000', 
  textAlign: 'center'  }}>
        Trials: {trialCount}
      </div>
    </div>
  );
}

export default Page4;
