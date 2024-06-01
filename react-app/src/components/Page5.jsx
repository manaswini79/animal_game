import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import confetti from 'canvas-confetti';

function Page5() {
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
    app.loader.add('calfTexture', '/images/calf.png');
    app.loader.add('chickenTexture', '/images/chicken.png');
    app.loader.load(setup);

    function setup() {

    const style = new PIXI.TextStyle({
        fontFamily: 'Rocher',
        fontSize: 50,
        fill: '#000000',
        align: 'center',
      });
      const mytext = new PIXI.Text('The chicken stood ahead of the calf.', style);
      mytext.x = app.renderer.width / 2;
      mytext.y = app.renderer.height - 50;
      mytext.anchor.set(0.5, 1);
      app.stage.addChild(mytext);

      const calf = new PIXI.Sprite(app.loader.resources['calfTexture'].texture);
      calf.x = 900;
      calf.y = 400;
      calf.scale.set(0.1);
      calf.interactive = true;
      calf.buttonMode = true;
      calf.anchor.set(0.5);
      app.stage.addChild(calf);

      const chicken = new PIXI.Sprite(app.loader.resources['chickenTexture'].texture);
      chicken.x = 400;
      chicken.y = 500;
      chicken.scale.set(0.25);
      chicken.interactive = true;
      chicken.buttonMode = true;
      chicken.anchor.set(0.5);
      app.stage.addChild(chicken);

      let successAchieved = false;
      let trialCount = 0;

      const trialCountStyle = new PIXI.TextStyle({
        fontFamily: 'Rocher',
        fontSize: 30,
        fill: '#000000',
        align: 'center',
      });

      const trialCountText = new PIXI.Text(`Trials: ${trialCount}`, trialCountStyle);
      trialCountText.x = app.renderer.width - 150;
      trialCountText.y = 20;
      app.stage.addChild(trialCountText);

      calf.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

      chicken.on('pointerdown', onDragStart)
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
        }
      }

      function onDragEnd() {
        this.alpha = 1;
        if (!successAchieved) {
          this.dragging = false;
          trialCount++;
          trialCountText.text = `Trials: ${trialCount}`;
          if (
            Math.abs(chicken.x - calf.x) <= 100 &&
            Math.abs(chicken.y - calf.y) <= 100
          ) {
            showSuccessMessage();
            successAchieved = true;
            throwConfetti();
          }
        }
      }

      function showSuccessMessage() {
        const successStyle = new PIXI.TextStyle({
        fontFamily: 'Rocher',
        fontSize: 50,
        fill: '#000000',
        align: 'center',
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
        window.location.href = '/last';
      }

      function onButtonPrevClick() {
        console.log('Previous button clicked');
        window.location.reload();
      }

      function throwConfetti() {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }} />;
}

export default Page5;
