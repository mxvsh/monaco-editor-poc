import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import '@codingame/monaco-vscode-typescript-basics-default-extension';
import '@codingame/monaco-vscode-typescript-language-features-default-extension';
import { WrapperConfig } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { useEffect } from 'react';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';

const configureMonacoWorkers = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useWorkerFactory({
		ignoreMapping: true,
		workerLoaders: {
			editorWorkerService: () =>
				new Worker(
					new URL(
						'monaco-editor/esm/vs/editor/editor.worker.js',
						import.meta.url
					),
					{ type: 'module' }
				),
		},
	});
};

configureMonacoWorkers();

const codeUri = '/workspace/hello.ts';
const code = `function sayHello(): string {
return "Hello";
};`;

const wrapperConfig: WrapperConfig = {
	serviceConfig: {
		userServices: {
			...getKeybindingsServiceOverride(),
		},
		enableExtHostWorker: true,
		debugLogging: true,
	},
	editorAppConfig: {
		$type: 'extended',
		codeResources: {
			main: {
				text: code,
				uri: codeUri,
			},
			original: {
				text: code,
				uri: codeUri,
			},
		},
		useDiffEditor: false,
		userConfiguration: {
			json: JSON.stringify({
				'workbench.colorTheme': 'Default Dark Modern',
				'typescript.tsserver.web.projectWideIntellisense.enabled': true,
				'typescript.tsserver.web.projectWideIntellisense.suppressSemanticErrors':
					false,
				'diffEditor.renderSideBySide': false,
				'editor.lightbulb.enabled': 'on',
				'editor.glyphMargin': true,
				'editor.guides.bracketPairsHorizontal': true,
			}),
		},
	},
};

function App() {
	useEffect(() => {}, []);
	return (
		<div
			className='h-screen'
			style={{
				height: '100vh',
			}}
		>
			<MonacoEditorReactComp
				userConfig={{
					wrapperConfig,
				}}
			/>
		</div>
	);
}

export default App;
