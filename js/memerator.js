var Memerator = (function(document) {

	var memerator = {
		_inputs:  [],
		_R:       null,
		_top:     null,
		_bottom:  null,
		_current: null,
		_image:   null
	};
	
	memerator.init = function() {
		this
			.register()
			.createPaper()
			.drawImage()
			.drawTextLines()
			.fixPositions();
	};
	
	memerator.register = function() {
		this._inputs = document.querySelectorAll('.input');	
		
		for (var i = 0; i < this._inputs.length; i++) {
			var input = this._inputs[i];
			
			input.addEventListener('keyup', function() {
				Memerator.update(this.dataset['target'], this.value);
			});
		}
		
		var images = document.querySelectorAll('.img-option');
		
		for (var i = 0; i < images.length; i++) {
			images[i].addEventListener(
				'click',
				this.changeImage,
				true
			);
		}
		
		return this;
	};
	
	memerator.createPaper = function() {
		this._R = Raphael('holder', 400, 400);
		
		return this;
	};
	
	memerator.drawImage = function(image) {
		image = image || document.querySelector('.img-option.default');
		
		if (this._current) {
			this._current.className = 'img-option';
			this._image.remove();
		}
		
		this._current = image;
		this._current.className += ' selected';
		this._image = this._R.image(image.src, 0, 0, image.width, image.height);
		
		return this;
	};
	
	memerator.drawTextLines = function(top, bottom) {
		var R = this._R;
		
		top = top || 'Y U NO';
		bottom = bottom || 'FILL THIS FIELDS?';
		
		this._top = R.text(150, 24, top)
			.attr({
				'font':        '24px Impact',
				'font-weight': 'bold',
				'fill':        '#fff',
				'stroke':      '#000'
			});
		this._bottom = R.text(150, 200, bottom)
			.attr({
				'font':        '24px Impact',
				'font-weight': 'bold',
				'fill':        '#fff',
				'stroke':      '#000'
		});
		
		return this;
	};
	
	memerator.fixPositions = function() {
		if (this._current) {
			var width  = this._current.width;
			var height = this._current.height;
			
			this._R.setSize(width, height);
			
			console.log(width, height);
			
			this._top.attr({
				x: width / 2,
				y: 24
			}).toFront();
			
			this._bottom.attr({
				x: width / 2,
				y: height - 24
			}).toFront();
		}
	
		return this;
	};
	
	memerator.update = function(target, value) {
		this['_' + target].attr('text', value.toUpperCase());
	};
	
	memerator.changeImage = function(event) {
		if (!event.target.className.match(/\s+selected/)) {
			memerator
				.drawImage(event.target)
				.fixPositions();
			
		}
		
		return false;
	};
	
	return memerator;

})(document);