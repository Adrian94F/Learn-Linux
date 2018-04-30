/*
TODO: przerobić to na wysyłanie poleceń do serwera i odbieranie ich w formie tekstowej. AJAXy i inne duperszmity
 */


/*
"typed" printing (emulating user typing)
 */
function typed(finish_typing) {
    return function(term, message, delay, finish) {
        anim = true;
        var prompt = term.get_prompt();
        var c = 0;
        if (message.length > 0) {
            term.set_prompt('');
            var new_prompt = '';
            var interval = setInterval(function() {
                var chr = $.terminal.substring(message, c, c+1);
                new_prompt += chr;
                term.set_prompt(new_prompt);
                c++;
                if (c == length(message)) {
                    clearInterval(interval);
                    // execute in next interval
                    setTimeout(function() {
                        // swap command with prompt
                        finish_typing(term, message, prompt);
                        anim = false
                        finish && finish();
                    }, delay);
                }
            }, delay);
        }
    };
}
function length(string) {
    string = $.terminal.strip(string);
    return $('<span>' + string + '</span>').text().length;
}
var typed_prompt = typed(function(term, message, prompt) {
    term.set_prompt(message + ' ');
});
var typed_message = typed(function(term, message, prompt) {
    term.echo(message)
    term.set_prompt(prompt);
});

/*
main
 */
jQuery(document).ready(function($) {
	var id = 1;
	$('#terminal').terminal(function(command, term) {
		if (!command.replace(/\s/g, '').length) {
		    // nothing
		} else if (command == 'help') {
            typed_message(term, "available commands are js, test", 80);
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