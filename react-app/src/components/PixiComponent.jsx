// PixiComponent.jsx

import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

function PixiComponent() {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });

    pixiContainerRef.current.appendChild(app.view);

    // Add your PixiJS setup code here...
    app.loader.add('buttonTextureNext', '/images/next.png');
    app.loader.add('buttonTexturePrev', '/images/replay.png');
    app.loader.add('horseTexture', '/images/lamb.png');
    app.loader.add('bunnyTexture', '/images/pig.png');
    app.loader.load(setup);

    function setup() {
      const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: false,
        lineJoin: 'round',
      });

      const mytext = new PIXI.Text('The pig stood to one side of the lamb.', style);
      mytext.x = app.renderer.width / 2;
      mytext.y = app.renderer.height - 50;
      mytext.anchor.set(0.5, 1);
      app.stage.addChild(mytext);

      const horse = new PIXI.Sprite(app.loader.resources['horseTexture'].texture);
      horse.x = 800;
      horse.y = 200;
      horse.scale.set(0.5);
      app.stage.addChild(horse);

      const bunny = new PIXI.Sprite(app.loader.resources['bunnyTexture'].texture);
      bunny.interactive = true;
      bunny.buttonMode = true;
      bunny.anchor.set(0.5);
      bunny.scale.set(0.8);
      bunny.x = 400;
      bunny.y = 400;
      app.stage.addChild(bunny);

      let successAchieved = false;

      bunny.on('pointerdown', onDragStart)
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
            (newPosition.x >= 670 && newPosition.x <= 700) ||
            (newPosition.x >= 1180 && newPosition.x <= 1230) &&
            newPosition.y >= 350 &&
            newPosition.y <= 360
          ) {
            if (!successAchieved) {
              showSuccessMessage();
              successAchieved = true;
              this.dragging = false;
            }
          }
        }
      }

      function onDragEnd() {
        this.alpha = 1;
        if (!successAchieved) {
          this.dragging = false;
        }
      }

      function showSuccessMessage() {
        const successStyle = new PIXI.TextStyle({
          fontFamily: 'Arial',
          fontSize: 48,
          fill: ['#ffffff', '#ff0000'],
          stroke: '#4a1850',
          strokeThickness: 5,
          dropShadow: true,
          dropShadowColor: '#000000',
          dropShadowBlur: 4,
          dropShadowAngle: Math.PI / 6,
          dropShadowDistance: 6,
          wordWrap: false,
          lineJoin: 'round',
        });
        const message = new PIXI.Text('Success!', successStyle);
        message.x = app.screen.width / 2;
        message.y = app.screen.height / 2;
        message.anchor.set(0.5);

        app.stage.addChild(message);

        setTimeout(showButtons, 2000);
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

    //   function onButtonNextClick() {
    //     console.log('Next button clicked');
    //     window.location.reload(); // Reload the current page
    //   }
    function onButtonNextClick() {
        console.log('Next button clicked');
        window.location.href = '/page2'; // Navigate to the '/page2' route
    }
    
      
      function onButtonPrevClick() {
        console.log('Next button clicked');
        window.location.reload(); // Reload the current page
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }} />;
}

export default PixiComponent;
