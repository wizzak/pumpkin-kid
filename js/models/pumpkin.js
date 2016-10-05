var Pumpkin = function(spriteX, spriteY) {
    this.sprite = entitiesLayer.create(spriteX, spriteY, 'pumpkin');

    this.isOn = false;

    this.sprite.animations.add('off', [2], 0, false);
    this.sprite.animations.add('on', [0, 1], 4, true);
    this.sprite.animations.add('dead', [4, 5], 4, true);
    this.sprite.animations.play('off');

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.setSize(20, 16, 6, 0);

    this.visionMask = game.make.sprite(this.sprite.centerX, this.sprite.centerY, 'mask_50');
    this.visionMask.frame = 0;
    this.visionMask.anchor.set(0.5, 0.5);

    this.visionClockStart = game.rnd.integerInRange(0, 40);
}

Pumpkin.prototype.toggle = function() {
    this.sprite.animations.stop();
    this.isOn = !this.isOn;
    if (this.isOn) {
        this.sprite.animations.play('on');
    } else {
        this.sprite.animations.play('off');
    }
}

Pumpkin.prototype.updateVisionMask = function() {
    if (this.isOn) {
        // create light flicker effect
        if (visionClock == this.visionClockStart) {
            this.visionMask.frame = 0;
        } else if (visionClock == ((this.visionClockStart + 30) % 40)) {
            this.visionMask.frame = 1;
        }
        bitmap.draw(this.visionMask);
    }
}