import * as vscode from 'vscode';

const SEARCH_COMMAND = 'lets-search.search';

const getQuerySearchEngine = async (searchQuery: string) => {
  const settings = await vscode.workspace.getConfiguration();
  const engines = settings['ls-search'].engines as Array<SearchEngine>;

  const querySplitted = searchQuery.split(':');

  let engine = {
    key: 'g',
    url: 'https://www.google.com/search?q={%query%}',
  } as SearchEngine;

  if (querySplitted.length > 1) {
    const queryEngineKey = querySplitted[0];
    const engine = engines.find((engine) => engine.key === queryEngineKey);
    if (engine) {
      return engine;
    }
  }

  return engine;
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
    vscode.window.showErrorMessage('Search query cannot be empty');
    return;
  }

  const engine = await getQuerySearchEngine(searchQuery);
  const query = getQueryWithoutEngineKey(searchQuery);
  const searchUrl = buildSearchUrl(engine, query);

  await vscode.env.openExternal(vscode.Uri.parse(searchUrl));
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(SEARCH_COMMAND, searchCommandHandler);
  context.subscriptions.push(disposable);
}
