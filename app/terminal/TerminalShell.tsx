'use client';

import Image from 'next/image';
import type { ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from 'react-terminal-ui';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import {
  directories,
  directoryIcons,
  directoryOrder,
  isDirectory,
} from './data/directories';
import rectangles from 'figlet/importable-fonts/Rectangles.js';
import ogre from 'figlet/importable-fonts/Ogre.js';
import { MatrixOverlay } from './components/MatrixOverlay';

const user = 'guest';
const server = 'big.z';
const rootPath = '~';

type CommandDefinition = {
  readonly name: string;
  readonly description: string;
  readonly usage?: string;
};

const commandDefinitions: readonly CommandDefinition[] = [
  { name: 'about', description: 'Display profile overview' },
  { name: 'contact', description: 'Show contact information' },
  { name: 'help', description: 'List available commands' },
  { name: 'ls', description: 'List directory contents', usage: 'ls [dir]' },
  { name: 'cd', description: 'Change directory', usage: 'cd <dir>' },
  { name: 'joke', description: 'Fetch a programming joke' },
  { name: 'matrix', description: 'Enable matrix rain overlay' },
  {
    name: 'color',
    description: 'Change terminal color mode',
    usage: 'color <light|dark|ubuntu>',
  },
  { name: 'echo', description: 'Print text', usage: 'echo <text>' },
  { name: 'clear', description: 'Clear terminal output' },
  { name: 'credits', description: 'Show dependency credits' },
  { name: 'sudo', description: 'Try elevated privilege (just for fun)' },
  { name: 'hack', description: 'Simulate a hacking sequence' },
  { name: 'exit', description: 'Friendly reminder to stay' },
];

const themeKeys = ['light', 'dark', 'ubuntu'] as const;
type ThemeKey = (typeof themeKeys)[number];

const cssThemes = themeKeys;

const themeToColorMode: Record<ThemeKey, ColorMode> = {
  light: ColorMode.Light,
  dark: ColorMode.Dark,
  ubuntu: ColorMode.Dark,
};

function tokenize(input: string): string[] {
  const regex = /"([^\"]*)"|'([^']*)'|`([^`]*)`|[^\s]+/g;
  const tokens: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[3] ?? match[0]);
  }
  return tokens;
}

function isThemeKey(value: string): value is ThemeKey {
  return (themeKeys as readonly string[]).includes(value);
}

function longestCommonPrefix(words: readonly string[], start = 0): string {
  if (words.length === 0) {
    return '';
  }
  let index = start;
  const reference = words[0];
  while (index < reference.length) {
    const candidate = reference[index];
    const matches = words.every((word) => word[index] === candidate);
    if (!matches) {
      break;
    }
    index += 1;
  }
  return reference.slice(0, index);
}

const rainbowSaturation = 82;
const rainbowLightness = 66;

function rainbowColor(column: number, totalColumns: number): string {
  if (totalColumns <= 1) {
    return `hsl(0, ${rainbowSaturation}%, ${rainbowLightness}%)`;
  }
  const hue = Math.round((column / (totalColumns - 1)) * 360) % 360;
  return `hsl(${hue}, ${rainbowSaturation}%, ${rainbowLightness}%)`;
}

function renderRainbowFiglet(text: string): ReactElement {
  const lines = text.split('\n');
  return (
    <pre className="terminal-banner">
      {lines.map((line, lineIndex) => {
        const length = Math.max(line.length, 1);
        return (
          <span key={`line-${lineIndex}`}>
            {Array.from(line).map((char, charIndex) => (
              <span
                key={`char-${lineIndex}-${charIndex}`}
                style={{ color: rainbowColor(charIndex, length) }}
              >
                {char === ' ' ? '\u00a0' : char}
              </span>
            ))}
            {lineIndex < lines.length - 1 ? '\n' : null}
          </span>
        );
      })}
    </pre>
  );
}

type OutputOptions = {
  pre?: boolean;
  className?: string;
  reset?: boolean;
};

export function TerminalShell() {
  const [lineData, setLineData] = useState<ReactElement[]>([]);
  const [cwd, setCwd] = useState(rootPath);
  const [matrixActive, setMatrixActive] = useState(false);
  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  const lineKeyRef = useRef(0);
  const fontReadyRef = useRef(false);
  const bootstrappedRef = useRef(false);

  const commandNames = useMemo(
    () => commandDefinitions.map((command) => command.name),
    [],
  );
  const directoryOptions = useMemo(() => [...directoryOrder], []);
  const colorOptions = useMemo(() => [...themeKeys], []);

  const prompt = `${user}@${server}:${cwd}$`;

  const nextKey = useCallback(() => {
    const key = `line-${lineKeyRef.current}`;
    lineKeyRef.current += 1;
    return key;
  }, []);

  const pushOutput = useCallback(
    (content: string | ReactElement, options?: OutputOptions) => {
      const key = nextKey();
      const child =
        typeof content === 'string' ? (
          options?.pre ? (
            <pre className={options?.className ?? 'terminal-text'}>
              {content}
            </pre>
          ) : (
            <span className={options?.className ?? 'terminal-text'}>
              {content}
            </span>
          )
        ) : (
          content
        );

      const outputNode = <TerminalOutput key={key}>{child}</TerminalOutput>;

      setLineData((prev) =>
        options?.reset ? [outputNode] : [...prev, outputNode],
      );
    },
    [nextKey],
  );

  const pushInput = useCallback(
    (command: string, path: string) => {
      const key = nextKey();
      const promptForLine = `${user}@${server}:${path}$`;
      setLineData((prev) => [
        ...prev,
        <TerminalInput key={key} prompt={promptForLine}>
          {command}
        </TerminalInput>,
      ]);
    },
    [nextKey],
  );

  const applyTheme = useCallback((theme: ThemeKey) => {
    const body = document.body;
    cssThemes.forEach((name) => {
      body.classList.remove(`theme-${name}`);
    });
    if ((cssThemes as readonly string[]).includes(theme)) {
      body.classList.add(`theme-${theme}`);
    }
  }, []);

  const handleHelp = useCallback(() => {
    pushOutput(
      <div className="terminal-section">
        <p className="terminal-heading">Available commands</p>
        <ul className="terminal-command-list">
          {commandDefinitions.map((command) => (
            <li key={command.name} className="terminal-command-list__item">
              <span className="terminal-highlight terminal-highlight--command">
                {command.name}
              </span>
              {command.usage ? (
                <span className="terminal-usage">{command.usage}</span>
              ) : null}
              <span className="terminal-description">
                {command.description}
              </span>
            </li>
          ))}
        </ul>
      </div>,
    );
  }, [pushOutput]);

  const handleContact = useCallback(() => {
    pushOutput(
      'Email   : ezechielagban1@gmail.com\nPhone   : +228 91 35 59 86\nLocation: Lome, Togo\nWebsite : https://ezechiel.bigz.dev',
      { pre: true, className: 'terminal-text' },
    );
  }, [pushOutput]);

  const handleAbout = useCallback(() => {
    pushOutput(
      <div className="terminal-card">
        <Image
          src="/profil.jpg"
          alt="Ezechiel AGBAN profile"
          width={150}
          height={150}
          className="terminal-avatar"
        />
        <p>
          Hey there! I am <strong>Ezechiel</strong> (BigZ) a data scientist and
          software developer who enjoys crafting useful, human centric tools.
          Away from the keyboard you will probably spot me sketching interfaces
          or solving a Rubik cube.
        </p>
      </div>,
    );
  }, [pushOutput]);

  const handleCredits = useCallback(() => {
    pushOutput(
      'Powered by:\n- Next.js + React\n- react-terminal-ui\n- figlet\n- JokeAPI',
      { pre: true, className: 'terminal-text' },
    );
  }, [pushOutput]);

  const handleSudo = useCallback(() => {
    pushOutput('sudo: permission denied - you are not root here.', {
      className: 'terminal-text',
    });
  }, [pushOutput]);

  const handleHack = useCallback(() => {
    pushOutput('Initiating ultra secret hacking protocol...', {
      className: 'terminal-text',
    });
    window.setTimeout(() => {
      pushOutput('Access denied. This is not Mr. Robot. Stay ethical.', {
        className: 'terminal-text',
      });
    }, 1500);
  }, [pushOutput]);

  const handleExit = useCallback(() => {
    pushOutput(
      'Why leave so soon? Try a joke or explore another directory first!',
      {
        className: 'terminal-text',
      },
    );
  }, [pushOutput]);

  const printDirectories = useCallback(() => {
    pushOutput(
      <div className="terminal-section">
        <p className="terminal-heading">Available directories</p>
        <ul className="terminal-directory-list">
          {directoryOrder.map((dir) => (
            <li key={dir} className="terminal-directory-list__item">
              <span className="terminal-directory-icon">
                {directoryIcons[dir]}
              </span>
              <span className="terminal-highlight terminal-highlight--directory">
                {dir}
              </span>
            </li>
          ))}
        </ul>
      </div>,
    );
  }, [pushOutput]);

  const handleLs = useCallback(
    (args: string[], currentPath: string) => {
      if (args.length === 0) {
        if (currentPath === rootPath) {
          printDirectories();
          return;
        }
        const activeDir = currentPath.replace(`${rootPath}/`, '');
        if (isDirectory(activeDir)) {
          pushOutput(directories[activeDir].join('\n'), {
            pre: true,
            className: 'terminal-text',
          });
        } else {
          pushOutput('Invalid directory state.', {
            className: 'terminal-text',
          });
        }
        return;
      }

      const target = args[0];
      if (target === '~' || target === '..') {
        printDirectories();
        return;
      }

      const normalized = target.startsWith('~/') ? target.slice(2) : target;
      if (isDirectory(normalized)) {
        pushOutput(directories[normalized].join('\n'), {
          pre: true,
          className: 'terminal-text',
        });
      } else {
        pushOutput(
          <span>
            Directory not found:{' '}
            <span className="terminal-highlight terminal-highlight--directory">
              {target}
            </span>
          </span>,
        );
      }
    },
    [printDirectories, pushOutput],
  );

  const handleCd = useCallback(
    (args: string[]) => {
      if (args.length === 0 || args[0] === '..' || args[0] === '~') {
        setCwd(rootPath);
        pushOutput('Changed to home directory', { className: 'terminal-text' });
        return;
      }

      const target = args[0];
      const normalized = target.startsWith('~/') ? target.slice(2) : target;

      if (isDirectory(normalized)) {
        setCwd(`${rootPath}/${normalized}`);
        pushOutput(
          <span>
            Changed to directory:{' '}
            <span className="terminal-highlight terminal-highlight--path">
              ~/{normalized}
            </span>
          </span>,
        );
      } else {
        pushOutput(
          <span>
            Directory not found:{' '}
            <span className="terminal-highlight terminal-highlight--directory">
              {target}
            </span>
          </span>,
        );
      }
    },
    [pushOutput],
  );

  const handleJoke = useCallback(async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await response.json();
      if (data.type === 'twopart') {
        pushOutput(`Q: ${data.setup}\nA: ${data.delivery}`, {
          pre: true,
          className: 'terminal-text',
        });
      } else {
        pushOutput(data.joke, { className: 'terminal-text' });
      }
    } catch (error) {
      pushOutput('Unable to fetch a joke right now. Try again later.', {
        className: 'terminal-text',
      });
    }
  }, [pushOutput]);

  const handleMatrix = useCallback(() => {
    setMatrixActive(true);
    pushOutput(
      'Matrix overlay engaged. Press ESC or click to exit the simulation.',
      {
        className: 'terminal-text',
      },
    );
  }, [pushOutput]);

  const handleColor = useCallback(
    (args: string[]) => {
      if (args.length === 0) {
        pushOutput(
          <span>
            Usage:{' '}
            <span className="terminal-highlight terminal-highlight--command">
              color
            </span>{' '}
            &lt;{themeKeys.join(' | ')}&gt;
          </span>,
        );
        return;
      }
      const target = args[0].toLowerCase();
      if (!isThemeKey(target)) {
        pushOutput(
          <div className="terminal-section">
            <p>
              Unknown color mode:{' '}
              <span className="terminal-highlight terminal-highlight--mode">
                {target}
              </span>
            </p>
            <p className="terminal-heading">Available modes</p>
            <ul className="terminal-mode-list">
              {themeKeys.map((mode) => (
                <li key={mode} className="terminal-mode-list__item">
                  <span className="terminal-highlight terminal-highlight--mode">
                    {mode}
                  </span>
                </li>
              ))}
            </ul>
          </div>,
        );
        return;
      }
      applyTheme(target);
      setColorMode(themeToColorMode[target]);
      pushOutput(
        <span>
          Color mode switched to{' '}
          <span className="terminal-highlight terminal-highlight--mode">
            {target}
          </span>
        </span>,
      );
    },
    [applyTheme, pushOutput],
  );

  const handleEcho = useCallback(
    (args: string[]) => {
      if (args.length === 0) {
        pushOutput('echo: missing arguments', { className: 'terminal-text' });
        return;
      }
      pushOutput(args.join(' '), { className: 'terminal-text' });
    },
    [pushOutput],
  );

  const handleClear = useCallback(() => {
    setLineData([]);
  }, []);

  const computeAutocomplete = useCallback(
    (value: string) => {
      const result = {
        nextValue: null as string | null,
        matches: [] as string[],
      };
      if (!value) {
        return result;
      }

      const endsWithSpace = /\s$/.test(value);
      const tokens = value.trim().length > 0 ? value.trim().split(/\s+/) : [];
      if (tokens.length === 0) {
        return result;
      }

      const currentCommand = tokens[0];

      if (tokens.length === 1 && !endsWithSpace) {
        const prefix = currentCommand;
        const baseIndex = value.lastIndexOf(prefix);
        const base = baseIndex > 0 ? value.slice(0, baseIndex) : '';
        const matches = commandNames.filter((name) => name.startsWith(prefix));
        if (matches.length === 0) {
          return result;
        }
        if (matches.length === 1) {
          result.nextValue = `${base}${matches[0]} `;
          return result;
        }
        const shared = longestCommonPrefix(matches, prefix.length);
        if (shared.length > prefix.length) {
          result.nextValue = `${base}${shared}`;
          return result;
        }
        result.matches = matches;
        return result;
      }

      const pool =
        currentCommand === 'color'
          ? colorOptions
          : currentCommand === 'cd' || currentCommand === 'ls'
          ? directoryOptions
          : [];

      if (pool.length === 0) {
        return result;
      }

      const lastToken = endsWithSpace ? '' : tokens[tokens.length - 1] ?? '';
      const lastTokenIndex =
        !endsWithSpace && lastToken
          ? value.lastIndexOf(lastToken)
          : value.length;
      const base = value.slice(0, Math.max(0, lastTokenIndex));

      const hasTilde = lastToken.startsWith('~/');
      const cleanPrefix = hasTilde ? lastToken.slice(2) : lastToken;
      const matches = pool.filter((option) => option.startsWith(cleanPrefix));
      if (matches.length === 0) {
        return result;
      }

      const prefixWithTilde = hasTilde ? '~/' : '';

      if (matches.length === 1) {
        const completion = matches[0];
        result.nextValue = `${base}${prefixWithTilde}${completion} `;
        return result;
      }

      const shared = longestCommonPrefix(matches, cleanPrefix.length);
      if (shared.length > cleanPrefix.length) {
        result.nextValue = `${base}${prefixWithTilde}${shared}`;
        return result;
      }

      result.matches = matches.map((match) => `${prefixWithTilde}${match}`);
      return result;
    },
    [colorOptions, commandNames, directoryOptions],
  );

  const runCommand = useCallback(
    async (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) {
        return;
      }

      pushInput(trimmed, cwd);

      const tokens = tokenize(trimmed);
      if (tokens.length === 0) {
        return;
      }

      const [command, ...args] = tokens;
      const lcCommand = command.toLowerCase();

      switch (lcCommand) {
        case 'help':
          handleHelp();
          break;
        case 'about':
          handleAbout();
          break;
        case 'contact':
          handleContact();
          break;
        case 'ls':
          handleLs(args, cwd);
          break;
        case 'cd':
          handleCd(args);
          break;
        case 'joke':
          await handleJoke();
          break;
        case 'matrix':
          handleMatrix();
          break;
        case 'color':
          handleColor(args);
          break;
        case 'echo':
          handleEcho(args);
          break;
        case 'clear':
          handleClear();
          break;
        case 'credits':
          handleCredits();
          break;
        case 'sudo':
          handleSudo();
          break;
        case 'hack':
          handleHack();
          break;
        case 'exit':
          handleExit();
          break;
        default:
          pushOutput(
            <span>
              Command not found:{' '}
              <span className="terminal-highlight terminal-highlight--command">
                {command}
              </span>
            </span>,
          );
      }
    },
    [
      cwd,
      handleAbout,
      handleCd,
      handleClear,
      handleColor,
      handleContact,
      handleCredits,
      handleEcho,
      handleExit,
      handleHack,
      handleHelp,
      handleJoke,
      handleLs,
      handleMatrix,
      handleSudo,
      pushInput,
      pushOutput,
    ],
  );

  useEffect(() => {
    applyTheme('dark');
    return () => {
      cssThemes.forEach((name) => {
        document.body.classList.remove(`theme-${name}`);
      });
    };
  }, [applyTheme]);

  useEffect(() => {
    if (bootstrappedRef.current) {
      return;
    }
    bootstrappedRef.current = true;
    if (!fontReadyRef.current) {
      figlet.parseFont('Standard', standard);
      figlet.parseFont('Ogre', ogre);
      figlet.parseFont('Rectangles', rectangles);
      fontReadyRef.current = true;
    }
    const fonts: readonly string[] = ['Standard', 'Ogre', 'Rectangles'];
    const selectedFont =
      fonts[Math.floor(Math.random() * fonts.length)] ?? 'Standard';
    const viewportWidth = window.innerWidth || 0;
    const bannerText =
      viewportWidth > 0 && viewportWidth < 1024
        ? 'Ezechiel\nAGBAN'
        : 'Ezechiel AGBAN';
    const ascii = figlet.textSync(bannerText, {
      font: selectedFont,
      horizontalLayout: 'fitted',
      width: 120,
    });
    pushOutput(renderRainbowFiglet(ascii), { reset: true });
    pushOutput('Software Developer & Data Scientist', {
      className: 'terminal-text',
    });
    pushOutput('Type "help" to explore available commands.', {
      className: 'terminal-text',
    });
    const timer = window.setTimeout(() => {
      void runCommand('help');
    }, 400);
    return () => window.clearTimeout(timer);
  }, [pushOutput, runCommand]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (!target || !target.classList.contains('terminal-hidden-input')) {
        return;
      }
      event.preventDefault();

      const inputEl = target as HTMLInputElement;
      const { nextValue, matches } = computeAutocomplete(inputEl.value);

      if (nextValue) {
        inputEl.value = nextValue;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.setSelectionRange(nextValue.length, nextValue.length);
        return;
      }

      if (matches.length > 0) {
        pushOutput(
          <div className="terminal-hint">
            <span>Suggestions:</span>
            <div className="terminal-hint__options">
              {matches.map((option) => (
                <span
                  key={option}
                  className="terminal-highlight terminal-highlight--suggestion"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>,
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [computeAutocomplete, pushOutput]);

  return (
    <div className="terminal-shell">
      <MatrixOverlay
        active={matrixActive}
        onClose={() => {
          setMatrixActive(false);
          pushOutput('Exited matrix overlay.', { className: 'terminal-text' });
        }}
      />
      <Terminal
        name="BigZ Terminal"
        colorMode={colorMode}
        prompt={prompt}
        height="100%"
        onInput={(value) => {
          void runCommand(value);
        }}
      >
        {lineData}
      </Terminal>
    </div>
  );
}
