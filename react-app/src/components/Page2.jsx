import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

function Page2() {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xc9e4de,
    });

    pixiContainerRef.current.appendChild(app.view);

    app.loader.add('buttonTextureNext', '/images/next.png');
    app.loader.add('buttonTexturePrev', '/images/replay.png');
    app.loader.add('sheepTexture', '/images/sheep.png');
    app.loader.add('dogTexture', '/images/dog.png');
    app.loader.load(setup);

    function setup() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold', // Added bold font weight
            fill: '#000000', // Set text color to black
            backgroundColor: '#00ff99', // Added background color
            padding: 10, // Added padding for background
            borderRadius: 50, // Added border radius for oval-like shape
        });
        

      const mytext = new PIXI.Text('The dog sat in front of the sheep.', style);
      mytext.x = app.renderer.width / 2;
      mytext.y = app.renderer.height - 50;
      mytext.anchor.set(0.5, 1);
      app.stage.addChild(mytext);

      const sheep = new PIXI.Sprite(app.loader.resources['sheepTexture'].texture);
      sheep.x = 800;
      sheep.y = 200;
      sheep.scale.set(0.15);
      app.stage.addChild(sheep);

      const dog = new PIXI.Sprite(app.loader.resources['dogTexture'].texture);
      dog.interactive = true;
      dog.buttonMode = true;
      dog.anchor.set(0.5);
      dog.scale.set(0.15);
      dog.x = 400;
      dog.y = 400;
      app.stage.addChild(dog);

      let successAchieved = false;

      dog.on('pointerdown', onDragStart)
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

          
          
          console.log(this.x)
            console.log(this.y)

          if (
            newPosition.x >= 880 && newPosition.x <= 1080  &&
            newPosition.y >= 300 && newPosition.y <= 390
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
        window.location.href = '/page3'; // Navigate to the '/page2' route
    }
      
      function onButtonPrevClick() {
        console.log('previous button clicked');
        window.location.reload(); // Reload the current page
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }} />;
}

export default Page2;
