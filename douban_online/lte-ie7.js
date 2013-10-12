/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-picture' : '&#xe001;',
			'icon-remove' : '&#xe002;',
			'icon-happy' : '&#xe003;',
			'icon-smiley' : '&#xe004;',
			'icon-camera' : '&#xe005;',
			'icon-home' : '&#xe007;',
			'icon-cog' : '&#xe00b;',
			'icon-loading' : '&#xe00c;',
			'icon-loading-2' : '&#xe00d;',
			'icon-checkmark' : '&#xe00e;',
			'icon-wrench' : '&#xe010;',
			'icon-user' : '&#xe006;',
			'icon-film' : '&#xe011;',
			'icon-comments' : '&#xe000;',
			'icon-pencil' : '&#xe00a;',
			'icon-book' : '&#xe009;',
			'icon-mail' : '&#xe008;',
			'icon-trashcan' : '&#xe00f;',
			'icon-home-2' : '&#xe012;',
			'icon-location' : '&#xe013;',
			'icon-comments-2' : '&#xe014;',
			'icon-eye' : '&#xe015;',
			'icon-code' : '&#xe016;',
			'icon-map-pin-alt' : '&#xe017;',
			'icon-paperclip' : '&#xe018;',
			'icon-thumbs-up' : '&#xe019;',
			'icon-thumbs-down' : '&#xe01a;',
			'icon-coffee' : '&#xe01b;',
			'icon-remove-2' : '&#xe01c;',
			'icon-remove-3' : '&#xe01d;',
			'icon-eye-2' : '&#xe01e;',
			'icon-heart' : '&#xe01f;',
			'icon-plus' : '&#xe020;',
			'icon-minus' : '&#xe021;',
			'icon-code-2' : '&#xe022;',
			'icon-cog-2' : '&#xe023;',
			'icon-comment' : '&#xe024;',
			'icon-wrench-2' : '&#xe025;',
			'icon-pen-alt-stroke' : '&#xe026;',
			'icon-book-alt2' : '&#xe027;',
			'icon-pen-alt2' : '&#xe028;',
			'icon-download' : '&#xe029;',
			'icon-left-quote' : '&#xe02a;',
			'icon-right-quote' : '&#xe02b;',
			'icon-eye-3' : '&#xe02c;',
			'icon-location-2' : '&#xe02d;',
			'icon-pencil-2' : '&#xe02e;',
			'icon-picture-2' : '&#xe02f;',
			'icon-menu' : '&#xe030;',
			'icon-loop' : '&#xe031;',
			'icon-music' : '&#xe032;',
			'icon-box-add' : '&#xe033;',
			'icon-comments-3' : '&#xe034;',
			'icon-download-2' : '&#xe035;',
			'icon-bookmark' : '&#xe036;',
			'icon-bookmark-2' : '&#xe037;',
			'icon-attachment' : '&#xe038;',
			'icon-file-css' : '&#xe039;',
			'icon-file-xml' : '&#xe03a;',
			'icon-comment-alt2-fill' : '&#xe03b;',
			'icon-comment-alt2-stroke' : '&#xe03c;',
			'icon-reload-alt' : '&#xe03d;',
			'icon-chrome' : '&#xe03e;',
			'icon-firefox' : '&#xe03f;',
			'icon-IE' : '&#xe040;',
			'icon-safari' : '&#xe041;',
			'icon-opera' : '&#xe042;',
			'icon-volume' : '&#xe043;',
			'icon-volume-2' : '&#xe044;',
			'icon-pause' : '&#xe045;',
			'icon-last' : '&#xe046;',
			'icon-first' : '&#xe047;',
			'icon-eject' : '&#xe048;',
			'icon-play-alt' : '&#xe049;',
			'icon-music-2' : '&#xe04a;',
			'icon-heart-2' : '&#xe04b;',
			'icon-pause-2' : '&#xe04c;',
			'icon-stop' : '&#xe04d;',
			'icon-play' : '&#xe04e;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};