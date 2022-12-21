import * as vscode from 'vscode';

const SEARCH_COMMAND = 'lets-search.search';

const getDefaultEngine = async () => {
  const settings = await vscode.workspace.getConfiguration();
  const engines = settings['lets-search'].engines as Array<SearchEngine>;
  console.log('🚀 ~ file: extension.ts:8 ~ getDefaultEngine ~ engines', engines);

  const defaultEngine = engines.find((engine) => engine.default);
  console.log('🚀 ~ file: extension.ts:10 ~ getDefaultEngine ~ defaultEngine', defaultEngine);

  const engineFallBack = {
    key: 'g',
    url: 'https://www.google.com/search?q={%query%}',
  } as SearchEngine;

  return defaultEngine || engineFallBack;
};

const getEngineByKey = async (key: string) => {
  const settings = await vscode.workspace.getConfiguration();
  const engines = settings['lets-search'].engines as Array<SearchEngine>;
  const engine = engines.find((engine) => engine.key === key);

  return engine;
};

const getEngineFromQuery = async (searchQuery: string) => {
  const querySplitted = searchQuery.split(':');

  if (querySplitted.length > 1) {
    const queryEngineKey = querySplitted[0];
    const engine = await getEngineByKey(queryEngineKey);
    if (engine) {
      return engine;
    }
  }

  const defaultEngine = await getDefaultEngine();
  return defaultEngine;
};

const getQueryWithoutEngineKey = (searchQuery: string) => {
  let query = searchQuery;
  const querySplitted = searchQuery.split(':');
  if (querySplitted.length > 1) {
    query = querySplitted.slice(1, querySplitted.length).join(':');
  }

  return query;
};

const buildSearchUrl = (engine: SearchEngine, query: string) => {
  const searchUrl = engine.url.replace('{%query%}', query);
  return searchUrl;
};

const searchCommandHandler = async () => {
  const searchQuery = await vscode.window.showInputBox({
    placeHolder: 'Search query',
    prompt: 'Search on browser',
  });

  if (!searchQuery) {
    return;
  }

  const engine = await getEngineFromQuery(searchQuery);
  const query = getQueryWithoutEngineKey(searchQuery);
  const searchUrl = buildSearchUrl(engine, query);

  await vscode.env.openExternal(vscode.Uri.parse(searchUrl));
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(SEARCH_COMMAND, searchCommandHandler);
  context.subscriptions.push(disposable);
}
