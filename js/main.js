/*
 * useful global variables
 */
var term;
var help = [
	"Dumny ty jesteś z siebie? Czy masz ty w ogóle jakiś rozum i godność człowieka?\nZastanaów się nad tym, co żeś zrobił, przemyśl swoje zachowanie.",
	"Potrzebujesz pomocy? Zgubiłeś się? Wybierz po prostu którąś z lekcji w panelu po lewej stronie. Powodzenia!",
	"Copyright © 2018 Adrian Frydmański, Krzysztof Cabała. Wszelkie i niewszelkie prawa zastrzeżone.\nWykorzystano następujące projekty:\n* JQuery Terminal - https://terminal.jcubic.pl\n* Bash-Emulator - https://trybash.github.io/bash-emulator/"
]
var lessons = [
	["Wprowadzenie", "\"Czym jest terminal? Dlaczego warto się go uczyć? Nie mogę sobie wysztkiego wyklikać?\"\n" + 
		"Jeśli zadajesz sobie te pytania, to wiedz, że coś się dzieje, i dziękuj losowi że trafiłes na tę stronę.\n" + 
		"Terminal to \"komunikator\" na linii system operacyjny - użytkownik. \n" + 
		"Piszesz do niego co ma zrobić, a on to robi, chyba że nie umie."],
	["Struktura katalogów", "Opis struktury systemu plików\n" + 
		"W systemie Linux katalogi i pliki usystematyzowane są w sposób hierarchinczy. Od \"korzenia\" czyli katalogu / po ostatni, najbardziej ukryty, najgłebiej schowany plik.\n" + 
		"Struktura typowego systemu plików zawiera katalogi:\n" + "/\n" +"├── bin\n" +"├── boot\n" +"├── cdrom\n" +"├── dev\n" +"├── etc\n" +"├── home\n" +"├── initrd.img\n" +"├── lib\n" +"├── lib64\n" +"├── lost+found\n" +"├── media\n" +"├── mnt\n" +"├── opt\n" +"├── proc\n" +"├── root\n" +"├── run\n" +"├── sbin\n" +"├── srv\n" +"├── sys\n" +"├── tmp\n" +"├── usr\n" +"├── var\n" +"└── vmlinuz \n" + "\n" +
		"Większość z nich to katalogi systemowe, które na tym etapie są dla ciebie jak czarna magia, są, ale wolisz nie wiedzieć po co i dlaczego, i wiesz, że lepiej ich nie ruszać.\n" + 
		"Na tę chwilę interesują cię katalog /home czyli katalog w którym swoje miejsca pracy mają użytkownicy. Pozostałe są w naszym kursie ukryte. \n" +
		"W Linuxie możesz adresować na dwa sposoby.\n" + 
		"Sposób relatywny: wpisujesz miejsce którego szukasz, od miejsca w którym się znajdujesz.\n" +
		"Czyli, będąc w katalogu /home/user jeśli chcesz pracować z plikiem plik1 używasz jego nazwy.\n" + 
		"Jeśli znajduje się on w podkatalogu, to piszesz: podkatalog/plik. Oczywiście, podkatalogów może być mnóstwo.\n"+
		"W systemie istnieją \"specjalne ścieżki\", . i .. .\n" + 
		". Oznacza bieżący katalog w którym się znajdujesz.\n" +
		".. Oznacza katalog poziom wyżej. Będąc w /home/user, . oznacza /home/user, a .. oznacza /home. Proste? Mam nadzieję.\n" + 
		"Drugi sposób adresacji to ścieżki bezwzględne, nie ważne w którym miejscu systemu plików w tym momencie, zawsze oznaczają dokładnie to samo miejsce.\n" +
		"Ich zapis zaczyna się od / - tak, dobrze pamiętasz, to symbol root, czyli korzenia systemu plików.\n" +
		"Jak już pewnie się domyślasz, ścieżki budujesz po kolei, podążając za hierarchią, np: /home/user/katalog/plik."],
	["Przeszukiwanie katalogów", "Znając podstawy obsługi komputera wiesz pewnie, że pliki zapisane są w różnych katalogach.\n" + 
		"Terminal pozwala na poruszanie się wewnątrz katalogów, przechodzenie do podkatalogów i katalogów nadrzędnych.\n" + 
		"Głównym katalogiem jest \"\\\". Pod nim znajdują się wszystkie inne.\n" + 
		"Polecenia, które mogą Ci się przydać, to:\n" + 
		" - cd - pozwala na przechodzenie do innych katalogów.\n" + 
		"        Wpisanie \"cd katalog\" pozwala na przejście do podkatalogu \"katalog\"\n" + 
		"        \"cd ..\" przechodzi o jeden katalog w górę.\n" + 
		"        Możliwe jest przechodzenie o więcej, niż jeden katalog. Wystarczy rozdzielić je ukośnikiem:\n" + 
		"        \"cd katalog/podkatalog/podkatalog\".\n" + 
		"        Można również podać ścieżkę bezwzględną do określonego katalogu, np \"cd /home\".\n" + 
		"        Samo \"cd\" powoduje przejście do katalogu domowego użytkownika (tutaj \"/home/user\").\n" + 
		" - ls - wyświetla zawartość danego katalogu\n" + 
		"        Dostępne są też parametry, które po wpisaniu po \"ls\" powodują określone działanie:\n" + 
		"        -l - wypisanie plików z ich właściwościami (typem, datą utworzenia, nazwą, uprawnieniami).\n" + 
		"             Tutaj, z uwagi na uproszczony system plików, nieobsługiwane są uprawnienia użytkowników.\n" + 
		"        -a - wyświetlenie plików ukrytych. Plik jest ukryty, kiedy na początku nazwy zawiera kropkę (np. \".plik\").\n" + 
		" - pwd - wyświetla aktualną ścieżkę - lokalizację, w której się znajdujesz.\n--------\n" + 
		"Wypróbuj poznane polecenia, wyświetlając zawartość katalogu głównego i przechodząc do katalogów się w nim znajdujących."],
    ["Tworzenie katalogów", "Opis działania mkdir\n" + 
		"Polecenie mkdir służy do tworzenia katalogów. \n" +
        "Jego podstawowa składnia to: mkdir nazwa_katalogu \n" +
        "Zamiast nazwy, możesz podać ścieżkę, np katalog/katalog2/katalog3\n" +
        "Spróbuj stworzyć katalog /home/usuer/katalog1\n" + 
		"Następnie utwórz katalog /home/user/katalog2/katalog2.1\n" + 
		"Pewnie Ci się nie udało - nie mart się początki bywają trudne.\n" + 
		"Aby utworzyć katalog musisz być pewny, że wszystkie kalogi powyżej istnieją, czyli musisz stworzyć po kolei katalog2, później dopiero katalog katalog2.1\n" + 
		"Mam nadzieję, że tym razem Ci się uda!\n"],
	["Wyświetlanie plików", "Opis działania cat\n" + 
		"Polecenie cat, od angielskiego conCATenate służy zasadniczo do łączenia, ale najczęście używa się go do wyświetlania zawartości plków.\n" + 
		"Składnia wygląda następująco: " + 
		"cat plik1 plik2 plik3\n" + 
		"Plików może być dowolna liczba, ich zawartość zostanie domyślnie wyświetlona na standardowym wyjściu czyli w konsoli.\n" + 
		"Sprawdź, co zawiera w sobie plik journal.txt z katalogu domowego użytknownia user\n" + 
	 	"Następnie spróbuj odczytać zawartość plików /home/user/journal.txt i README.txt używając tylko jednego wywołania cat\n"],
	["Tworzenie plików", "Opis działania touch\n" + 
		"Następnym poleceniem jakie poznasz jest polecenie touch. Służy ono do \"dotykania\" pliku. W prawdziwym systemie modifikuje ono datę modyfikacji pliku, a jeśli taki plik nie istnieje tworzy nowy o takiej nazwie. Spróbuj utworzyć plik plik1.txt w miejscu w którym się znajdujesz. Potem sprawdź czy plik się utworzył za pomocą ls. Następnie utwórz plik /home/user/katalog69/plik96 i również zweryfikuj jego istnienie za pomocą ls" + 
		"\n"
		],
	["Test 1", 'Test sprawdzający umiejętności\n--------\n' +
		'Aby sprawdzić zdobyte umiejętności, spróbuj wykonać następujące zadania zapisane w pliku /README.txt.\n' +
		'Po wykonaniu ich wpisz polecenie check, żeby wyświetlić wynik. Powodzenia!\n--------'],
	["Kopiowanie katalogów i plików", "Opis działania cp\n" + 
		"Pamiętasz, że ludzie dzielą się na dwie grupy?\n" + 
		"Tych którzy robią kopie zapasowe\n" + 
		"I tych którzy dopiero zaczną je robić\n" + 
		"Do kopiowania katalogów i plików służy polecenie cp <skąd> <dokąd>\n" + 
		"np. cp plik kopia_pliku\n" +
	 	"Żeby przekopiwać katalog, trzeba jeszcze po cp dodać przełącznik  -r oznaczający recurssive\n" +
	    "czyli rekurencyjne schodzenie w dół drzewa katalogów\n" +
	 	"Spróbuj przekopiować dowolny katalog systemu plików w inne miejsce.\n"],
	["Przenoszenie katalogów i plików", "Opis działania mv\n" + 
		"Zdarza się, w sumie nawet często, że jakiś plik trzeba przenieść w inne miejsce, bez zachowywania kopii.\n" + 
		"W tym celu uzywa się polecenia move\n" + 
		"Jego składnia jest bardzo podobna do cp: mv <skad> <dokad>\n" + 
		"W odróżnieniu od cp nie ma potrzeby stosowania przełącznika -r, ponieważ przeniesienie katalogu implikuje przeniesienie\n" + 
		"Wszystkich jego wpisów, czyli plików i podkatalogów. Wynika to z organizacji systemu plików, ale to nie pora ani miejsce na takie wywody.\n" + 
		"--------\n" +
	 	"Częstym przypadkiem użycia mv jest zmiana nazwy pliku lub katalogu\n" +
		"To bardzo proste, wystarczy że wydamy polecenie mv z drugim paramaterem w tym samym katalogu\n" +
	    "Spróbuj, to proste!\n"+
		"--------\n"],
	["Usuwanie katalogów i plików", "Opis działania rm\n" + 
		"Nadeszła pora na najbardziej niebezpieczne (o ile źle używane) polecenie, czyli remove.\n" + 
		"Remove, czyli z angielskiego usuń, służy właśnie do usuwania\n" + 
		"Ale, UWAGA!!!, ACHTUNG!!!, WARNING!!!\n" + 
		"W terminalu nie ma kosza, wszystkie usunięte pliki lądują prosto w tzw. /dev/null'u czyli w tajemniczej, czarnej dziurze\n" + 
		"Legenda głosi, że w ten sposób można się pozbyć nawet ciała, ale do tej pory próbowano tylko z ciałem funkcji (sorry za inside joke)\n" + 
		"W sumie, nie wiem jak włożyć ciało do komputera, więc nie sprawdzę, żeby Ci pokazać.\n" + 
		"Dobra, do rzeczy, składnia: rm <plik> lub rm <lista plików rozdzielona spacją>\n" + 
		"Tak działa z plikami, spróbuj z katalogiem ;) \n" + 
		"Pewnie nie działa? A pamiętasz lekcję o cp? Tak, chodzi o przełącznik -r \n" + 
		"Spróbuj utworzyć plik, katalog, plik w katalogu a potem je pousuwaj\n" + 
		"Tutaj na szczęście nie musisz się bać, że zniszyszcz system plików albo usuniesz coś ważnego, bo co lekcję system plików jest odtwarzany\nEnjoy\n" + 
		"--------\n"],
	["Test 2", 'Test sprawdzający umiejętności\n--------\n' +
		'Aby sprawdzić zdobyte umiejętności, spróbuj wykonać następujące zadania zapisane w pliku /README.txt.\n' +
		'Po wykonaniu ich wpisz polecenie check, żeby wyświetlić wynik. Powodzenia!\n--------'],
];
var testIdx = [6, 10]; // numery lekcji, które są testami
var d = 5;

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
	typed_message(term, string, d);
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
		greetings: 
"                 .88888888:.\n                88888888.88888.\n              .8888888888888888.\n              888888888888888888\n              88' _`88'_  `88888\n              88 88 88 88  88888\n              88_88_::_88_:88888\n              88:::,::,:::::8888\n              88`:::::::::'`8888\n             .88  `::::'    8:88.\n            8888            `8:888.\n          .8888'             `888888.\n         .8888:..  .::.  ...:'8888888:.\n        .8888.'     :'     `'::`88:88888\n       .8888        '         `.888:8888.\n      888:8         .           888:88888\n    .888:88        .:           888:88888:\n    8888888.       ::           88:888888\n    `.::.888.      ::          .88888888\n   .::::::.888.    ::         :::`8888'.:.\n  ::::::::::.888   '         .::::::::::::\n  ::::::::::::.8    '      .:8::::::::::::.\n .::::::::::::::.        .:888:::::::::::::\n :::::::::::::::88:.__..:88888:::::::::::'\n  `'.:::::::::::88888888888.88:::::::::'\n     `':::_:' -- '' -'-' `':_::::'`\n\n"
+'Witaj w Learn Linux! Wybierz interesującą Cię lekcję z panelu po lewej, wpisz help lub credits.'
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
var testInstructions = ['- usunąć plik journal.txt z katalogu /home/user\n' +
		'- utworzyć katalog documents w lokalizacji /home/user\n' +
		'- utworzyć w nim plik notes.txt',
		'- skopiować plik README.txt do katalogu /home/user\n' +
		'- zmienić nazwę powyższego pliku w katalogu użytkownika na instrukcja.txt\n' +
		'- usunąć plik README.txt z katalogu głównego'
];

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
	term.clear();
	if (currentLesson == testIdx[0] || currentLesson == testIdx[1]) {
		resetEnv(currentLesson == testIdx[0] ? testInstructions[0] : testInstructions[1]);
		fastOut(lessons[number][0] + '\n--------\n' + lessons[number][1]);
	} else {
		fastOut('Lekcja ' + number + ': ' + lessons[number][0] + '\n--------\n' + lessons[number][1]);
	}
}

/*
 * check test results
 */
function checkResults() {
	var idealFileSystem;
	if (currentLesson == testIdx[0]) {
		idealFileSystem = {
			'/': {
				type: 'dir',
				modified: Date.now()
			},
			'/README.txt': {
				type: 'file',
				modified: Date.now(),
				content: testInstructions[0]
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
			},
			'/home/user/documents/notes.txt': {
				type: 'file',
				modified: Date.now(),
				content: ''
			}
		};
	} else if (currentLesson == testIdx[1]) {
		idealFileSystem = {
			'/': {
				type: 'dir',
				modified: Date.now()
			},
			'/home/user/instrukcja.txt': {
				type: 'file',
				modified: Date.now(),
				content: testInstructions[1]
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
	var result = compare(idealFileSystem, userFileSystem) && compare(userFileSystem, idealFileSystem)
	if (result) {
		fastOut('Brawo, udało się, jesteś wielki!');
	} else {
		fastOut('Popełniłeś błędy, spróbuj jeszcze raz.');
		resetEnv();
	}
}

function compare(idealFS, userFS) {
	for (i in idealFS) {
		var result = false;
		for (u in userFS) {
			if (i == u) {
				result = true;
			}
		}
		if (result == false) {
			return false;
		}
	}
	return true;
}
