/*
 * useful global variables
 */
var term;
var help = [
	"Dumny ty jesteś z siebie?",
	"Potrzebujesz pomocy? Zgubiłeś się? Wybierz po prostu którąś z lekcji w panelu po lewej stronie. Powodzenia!",
	"Copyright © 2018 Adrian Frydmański, Krzysztof Cabała. Wszelkie i niewszelkie prawa zastrzeżone.\nWykorzystano następujące projekty:\n* JQuery Terminal - https://terminal.jcubic.pl\n* Bash-Emulator - https://trybash.github.io/bash-emulator/"
]
var lessons = [
	["Wstęp do terminala", "Jakiś wstęp..."],
	["Przeszukiwanie katalogów", "Opis drzewa katalogów, opis działania cd..."],
	["Tworzenie katalogów", "Opis działania mkdir..."],
	["Wyświetlanie plików", "Opis działania cat..."],
	["Tworzenie plików", "Opis działania touch..."],
	["Test 1", 'Test sprawdzający umiejętności\n--------\n' +
		'Aby sprawdzić uzyskane umiejętności, spróbuj wykonać następujące zadania.\n' +
		' - usunąć plik journal.txt z katalogu /home/user\n' +
		' - utworzyć katalog documents w lokalizacji /home/user\n' +
		' - zmienić nazwę README.txt na my-readme.txt\n' +
		' - wyświetlić zawartość  my-readme.txt\n' +
		'--------\nPo wykonaniu ich wpisz polecenie check, żeby wyświetlić wynik. Powodzenia!\n--------'],
	["Kopiowanie katalogów i plików", "Opis działania cp..."],
	["Przenoszenie katalogów i plików", "Opis działania mv..."],
	["Usuwanie katalogów i plików", "Opis działania rm..."],
	["Test 2", 'Test sprawdzający umiejętności\n--------\n' +
		'Aby sprawdzić uzyskane umiejętności, spróbuj wykonać następujące zadania.\n' +
		'...cp, mv i rm...'+
		'--------\nPo wykonaniu ich wpisz polecenie check, żeby wyświetlić wynik. Powodzenia!\n--------'],
];
var testIdx = [5, 9]; // numery lekcji, które są testami

/*
 * "typed" printing (emulating user typing)
 */
function typed(finish_typing) {
	return function(term, message, delay, finish) {
		$('#blank').show();
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
						$('#blank').hide();
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
 * emulator and "file system"
 */
function log (result) {
	if (result) {
		fastOut(result);
	}
}

function error (result) {
	log(result)
}

var emulator;
resetEnv();

/*
 * reset file system
 */
function resetEnv(readme) {
	emulator = bashEmulator({
		workingDirectory: '/',
		fileSystem: {
			'/': {
				type: 'dir',
				modified: Date.now()
			},
			'/README.txt': {
				type: 'file',
				modified: Date.now(),
				content: (readme ? readme : 'empty...')
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
}

/*
 * main function
 */
jQuery(document).ready(function($) {
	prepare();
	var id = 1;
	term = $('#terminal').terminal(function(command, term) {
		if (!command.replace(/\s/g, '').length) {
		} else if (command == 'dupa') {
			fastOut(help[0]);
		} else if (command == 'help') {
			fastOut(help[1]);
		} else if (command == 'credits') {
			fastOut(help[2]);
		} else if (command == 'check') {
			checkResults();
		} else {
			//do something with command, you dumb fuck
			emulator.run(command).then(log, error);
		}
	}, {
		greetings: 'Witaj w Learn Linux! Wybierz interesującą Cię lekcję z panelu po prawej, wpisz help lub credits.'
	});
});

function prepare () {
	var list = document.getElementById('ol');
	for (var l in lessons) {
		var a = document.createElement('a')
		a.href = '#';
		a.innerHTML = lessons[l][0];
		var entry = document.createElement('li');
		entry.appendChild(a);
		entry.id = l;
		entry.onclick = lessonSelect;
		list.appendChild(entry);
	}
}

/*
 * lessons
 */
var currentLesson = -1;
function lessonSelect() {
	var number = this.id;
	if (number == currentLesson) {
		return;
	}
	currentLesson = number;
	term.echo(' ');
	if (currentLesson == testIdx[0] || currentLesson == testIdx[1]) {
		resetEnv();
		fastOut(lessons[number][0] + '\n--------\n' + lessons[number][1]);
	} else {
		fastOut('Wybrano lekcję ' + number + ': ' + lessons[number][0] + '\n--------\n' + lessons[number][1]);
	}
}

/*
 * check test results
 */
function checkResults() {
	var destinationFileSystem;
	if (currentLesson == 5) {
		destinationFileSystem = {
			'/': {
				type: 'dir',
				modified: Date.now()
			},
			'/my-readme.txt': {
				type: 'file',
				modified: Date.now(),
				content: 'empty...'
			},
			'/home': {
				type: 'dir',
				modified: Date.now()
			},
			'/home/user': {
				type: 'dir',
				modified: Date.now()
			},
			'/home/user/documents': {
				type: 'dir',
				modified: Date.now()
			}
		};
	} else if (currentLesson == 9) {
		destinationFileSystem = {
			'/': {
				type: 'dir',
				modified: Date.now()
			},
			'/README.txt': {
				type: 'file',
				modified: Date.now(),
				content: 'empty...'
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
		};
	} else {
		return;
	}
	var userFileSystem = emulator['state']['fileSystem'];
	var result = compare(userFileSystem, destinationFileSystem) && compare(destinationFileSystem, userFileSystem)
	if (result) {
		fastOut('Brawo, udało się, jesteś wielki!');
	} else {
		fastOut('Popełniłeś błędy, spróbuj jeszcze raz.');
		resetEnv();
	}
}

function compare(o1, o2) {
	for (o in o1) {
		if (!(o1[o] in o2)) {
			return false;
		}
	}
	return true;
}