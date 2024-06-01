import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import confetti from 'canvas-confetti';

function Page1() {
  const pixiContainerRef = useRef(null);
  const [trialCount, setTrialCount] = useState(0);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xfaedcb,
    });

    pixiContainerRef.current.appendChild(app.view);

    app.loader.add('buttonTextureNext', '/images/next.png');
    app.loader.add('buttonTexturePrev', '/images/replay.png');
    app.loader.add('horseTexture', '/images/horse.png');
    app.loader.add('pigTexture', '/images/pig.png');
    app.loader.load(setup);

    function setup() {
      const style = new PIXI.TextStyle({
        fontFamily: 'Rocher',
        fontSize: 50,
        fill: '#000000',
        align: 'center',
      });

      const mytext = new PIXI.Text('The pig stood beside the horse.', style);
      mytext.x = app.renderer.width / 2;
      mytext.y = app.renderer.height - 50;
      mytext.anchor.set(0.5, 1);
      app.stage.addChild(mytext);

      const horse = new PIXI.Sprite(app.loader.resources['horseTexture'].texture);
      horse.x = 250;
      horse.y = 100;
      horse.scale.set(0.12);
      app.stage.addChild(horse);

      const pig = new PIXI.Sprite(app.loader.resources['pigTexture'].texture);
      pig.interactive = true;
      pig.buttonMode = true;
      pig.anchor.set(0.5);
      pig.scale.set(0.5);
      pig.x = 1100;
      pig.y = 450;
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
            newPosition.x >= 425 && newPosition.x <= 530 &&
            newPosition.y >= 421 && newPosition.y <= 470
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

        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

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
        window.location.href = '/page2';
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

export default Page1;
