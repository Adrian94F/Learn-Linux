/*
terminal variables
*/
var term;
var help = [
	"Dumny ty jesteś z siebie? Czy ty masz jakiś rozum i godność człowieka? Co ty w ogóle robisz ze swoim życiem?\nZrób coś dobrego dla ludzkości i napij się wybielacza.",
	"Potrzebujesz pomocy? Zgubiłeś się? Wybierz po prostu którąś z lekcji w panelu po lewej stronie. Powodzenia!",
	"Copyright © 2018 Adrian Frydmański, Krzysztof Cabała. Wszelkie i niewszelkie prawa zastrzeżone.\nWykorzystano następujące projekty:\n* JQuery Terminal - https://terminal.jcubic.pl\n* Bash-Emulator - https://trybash.github.io/bash-emulator/"
]

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
function fastOut(string) {
	typed_message(term, string, 50);
}

/*
emulator and "file system"
*/
function log (result) {
	if (result) {
		fastOut(result);
	}
}

function error (result) {
	log(result)
}

var emulator = bashEmulator({
	workingDirectory: '/',
	fileSystem: {
		'/': {
			type: 'dir',
			modified: Date.now()
		},
		'/README.txt': {
			type: 'file',
			modified: Date.now(),
			content: 'empty'
		},
		'/home': {
			type: 'dir',
			modified: Date.now()
		},
		'/home/user/journal.txt': {
			type: 'file',
			modified: Date.now(),
			content: 'this is private!'
		},
		'/home/user': {
			type: 'dir',
			modified: Date.now()
		}
	}
})

/*
main function
*/
jQuery(document).ready(function($) {
	var id = 1;
	term = $('#terminal').terminal(function(command, term) {
		if (!command.replace(/\s/g, '').length) {
		} else if (command == 'dupa') {
			fastOut(help[0]);
		} else if (command == 'help') {
			fastOut(help[1]);
		} else if (command == 'credits') {
			fastOut(help[2]);
		} else {
			//do something with command, you dumb fuck
			emulator.run(command).then(log, error);
		}
	}, {
		greetings: 'Witaj w Learn Linux!'
	});
});

