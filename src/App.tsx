import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import '@codingame/monaco-vscode-typescript-basics-default-extension';
import '@codingame/monaco-vscode-typescript-language-features-default-extension';
import { WrapperConfig } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';

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
		userConfiguration: {},
	},
};

function App() {
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
	return (
		<>
			<MonacoEditorReactComp
				userConfig={{
					wrapperConfig,
				}}
			/>
		</>
	);
}

export default App;
