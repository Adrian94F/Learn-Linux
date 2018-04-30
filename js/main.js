/*
TODO: przerobić to na wysyłanie poleceń do serwera i odbieranie ich w formie tekstowej. AJAXy i inne duperszmity
*/


jQuery(document).ready(function($) {
	var id = 1;
	$('#terminal').terminal(function(command, term) {
		if (!command.replace(/\s/g, '').length) {
		} else if (command == 'help') {
			term.echo("available commands are js, test");
		} else if (command == 'test'){
			term.push(function(command, term) {
				if (!command.replace(/\s/g, '').length) {
				} else if (command == 'help') {
					term.echo('if you type ping it will display pong');
				} else if (command == 'ping') {
					term.echo('pong');
				} else {
					term.echo('unknown command ' + command);
				}
			}, {
				prompt: 'test> ',
				name: 'test'});
		} else if (command == "js") {
			term.push(function(command, term) {
				var result = window.eval(command);
				if (result != undefined) {
					term.echo(String(result));
				}
			}, {
				name: 'js',
				prompt: 'js> '});
		} else {
			term.echo("unknown command " + command);
		}
	}, {
		greetings: "use help to see available commands"
	});
});