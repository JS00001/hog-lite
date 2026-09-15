import { Translations } from './en';

const ja = {
  navInsights: 'インサイト',
  navActivity: 'アクティビティ',
  navExceptions: '例外',
  navSettings: '設定',

  welcomeTitle: 'ようこそ',
  welcomeHeading: 'HogLiteへようこそ！',
  welcomeIntroBeforeLink: 'HogLiteは完全に',
  welcomeOpenSource: 'オープンソース',
  welcomeIntroAfterLink:
    'で、スマートフォンからインサイトやイベントなどを確認できるPostHogクライアントです。ご利用いただきありがとうございます！',
  getStarted: '始める',
  exploreSampleData: 'サンプルデータを見る',

  apiKey: 'APIキー',
  login: 'ログイン',
  howDoIGetThis: 'APIキーの取得方法',
  doYouStoreMyApiKey: 'APIキーは保存されますか？',
  apiKeyRequired: 'APIキーを入力してください',
  invalidApiKey: 'APIキーが正しくありません',
  mustBeAString: '文字列で入力してください',

  dataRegion: 'データリージョン',
  selectRegion: 'リージョンを選択',
  unitedStates: '米国',
  europeanUnion: '欧州連合',
  customEndpoint: 'カスタムエンドポイント',
  continue: '続ける',
  whatIsThis: 'データリージョンとは？',
  urlRequired: 'URLを入力してください',
  validUrlRequired: '有効なURLを入力してください',
  fieldRequired: '入力してください',

  selectTimePeriod: '期間を選択',
  today: '今日',
  yesterday: '昨日',
  last24Hours: '過去24時間',
  last7Days: '過去7日間',
  last30Days: '過去30日間',
  last90Days: '過去90日間',
  last180Days: '過去180日間',
  thisMonth: '今月',
  yearToDate: '年初来',
  allTime: '全期間',

  selectDashboard: 'ダッシュボードを選択',
  reload: '再読み込み',
  noInsightsFound: 'インサイトがありません',
  tryChangingFilters: 'フィルターを変更するか、再読み込みしてください。',
  couldNotFetchActivity: 'アクティビティを取得できませんでした',
  unsupportedInsightTitle: 'このインサイトにはまだ対応していません',
  unsupportedInsightDescription:
    'インサイトの読み込み中に問題が発生しました。この形式にはまだ対応していない可能性があります。',
  insightFunnel: 'ファネル',
  usersSuffix: 'ユーザー',
  totalCount: '合計数',
  insightBreakdown: '内訳',
  insightHasNoData: 'このインサイトにはまだデータがありません。',
  conversionTime: 'コンバージョン時間',
  averageTime: '平均時間',
  timeRange: '%{start}〜%{end}',

  selectEvent: 'イベントを選択',
  allEvents: 'すべてのイベント',
  filterTestUsers: '社内ユーザーとテストユーザーを除外',
  noEventsFound: 'イベントまたは例外がありません',
  eventColumn: 'イベント',
  personColumn: 'ユーザー',
  timeColumn: '時刻',
  justNow: 'たった今',
  minutesAgo: '%{count}分前',
  hoursAgo: '%{count}時間前',
  daysAgo: '%{count}日前',
  secondsShort: '%{count}秒',
  minutesShort: '%{count}分',
  hoursShort: '%{count}時間',
  daysShort: '%{count}日',

  project: 'プロジェクト',
  selectProject: 'プロジェクトを選択',
  organization: '組織',
  selectOrganization: '組織を選択',
  otherSettings: 'その他の設定',
  account: 'アカウント',
  accountDescription: '現在のPostHogアカウントを確認します',
  appearance: '外観',
  appearanceDescription: 'アプリの外観を変更します',
  contribute: 'コントリビュート',
  contributeDescription: 'オープンソースプロジェクトに参加します',
  reportBug: '不具合を報告',
  reportBugDescription: '不具合や機能の要望をお知らせください',
  shareWithFriends: '友達に共有',
  shareWithFriendsDescription: 'HogLiteを友達に紹介します',
  debug: 'デバッグ',
  debugDescription: 'デバッグ機能を確認・有効化します',
  logout: 'ログアウト',
  logoutTitle: 'ログアウトしますか？',
  logoutMessage: 'もう一度ログインするにはAPIキーの再入力が必要です。',
  cancel: 'キャンセル',
  nevermind: '戻る',

  yourAccount: 'アカウント',
  demoMode: 'デモモードを使用中です',
  email: 'メールアドレス',
  firstName: '名',
  lastName: '姓',

  theme: 'テーマ',
  selectTheme: 'テーマを選択',
  light: 'ライト',
  dark: 'ダーク',
  appIcon: 'アプリアイコン',
  spaceHog: 'スペースHog',
  happyHog: 'ハッピーHog',
  angryHog: 'アングリーHog',
  nerdyHog: 'ナードHog',
  blue: 'ブルー',
  orange: 'オレンジ',
  cowboyHog: 'カウボーイHog',
  builderHog: 'ビルダーHog',

  currentAppVersion: '現在のアプリバージョン',
  currentAppVersionDescription:
    '現在使用中のアプリのバージョンです。「バイナリバージョン - アップデートバージョン」の形式で表示されます。',
  developerMode: '開発者モード',
  developerModeDescription:
    '3本指で画面を押すと、ローカルの状態とネットワークログを確認できます。',
  updateAlertsEnabled: 'アップデート通知',
  updateAlertsDescription:
    'OTAアップデートが利用可能になったときに通知するかどうかを切り替えます。',

  activityScreenTitle: 'アクティビティ画面',
  activityScreenIntro: 'アクティビティ画面の使い方をご案内します。',
  activityGearTip:
    '表の左上にある歯車アイコンを押すと、列や表示モードなどを設定できます。',
  activityRowTip:
    '行を押すと、そのイベントのすべてのプロパティを確認できます。',
  closeInstructions: '説明を閉じる',
  insightsScreenTitle: 'インサイト画面',
  insightsScreenIntro: 'インサイト画面の使い方をご案内します。',
  insightsDashboardTip:
    '上部のドロップダウンから、プロジェクト内のダッシュボードを切り替えられます。',
  insightsSupportTip:
    '現在、集計、ファネル、コンバージョン時間ファネル、内訳を表示できます。未対応のインサイトが必要ですか？',
  requestFeature: '新機能をリクエスト',
  exceptionsScreenTitle: '例外画面',
  exceptionsScreenIntro: '例外画面の使い方をご案内します。',
  exceptionsTrackingTip:
    'PostHogの例外トラッキングにより、イベントと例外をまとめて管理できます。',
  exceptionRowTip: '行を押すと、その例外のすべてのプロパティを確認できます。',

  configureEventsTable: 'イベント表の設定',
  displayMode: '表示モード',
  selectDisplayMode: '表示モードを選択',
  full: 'フル',
  fullDescription:
    '各列を広く表示します。横方向のスクロールが必要になる場合があります',
  compact: 'コンパクト',
  compactDescription: '横方向にスクロールせず、画面幅にすべての列を表示します',
  visibleColumns: '表示する列',
  event: 'イベント',
  eventDescription: '発生したイベントの名前',
  person: 'ユーザー',
  personDescription: '操作を行ったユーザー',
  urlScreen: 'URL / 画面',
  urlScreenDescription: '操作が発生したURLまたは画面',
  timestamp: 'タイムスタンプ',
  timestampDescription: 'アクティビティが発生した時刻',
  save: '保存',

  dataRegionQuestion: 'データリージョンとは？',
  dataRegionDescription:
    'データリージョンはPostHogデータが保存される地域です。以下を参考に、最適なリージョンを選択してください。',
  usRegionFast: 'ユーザーが米国にいる場合に高速です',
  usRegionCompliance: '一部の米国規制に準拠しやすくなります',
  usRegionHosting: '米国バージニア州でホストされます',
  euRegionFast: 'ユーザーが欧州にいる場合に高速です',
  euRegionCompliance: 'GDPR要件に準拠するため、データをEU内に保持します',
  euRegionHosting: 'ドイツ・フランクフルトでホストされます',
  customRegionDescription:
    '独自ドメインでPostHogをホストしている組織のみ使用してください',
  dataSecurityTitle: 'いいえ、何も保存しません',
  dataSecurityDescription:
    'HogLiteは利用者のデータを保存しません。バックエンドも持たず、APIキーは端末内に保存され、PostHog APIとのみ直接通信します。',

  hiFriend: 'こんにちは！',
  sharePrompt:
    'HogLiteを気に入っていただけましたか？PostHogを使っている友達にHogLiteを紹介してください！',
  shareNow: '今すぐ共有',
  shareMessage:
    'PostHogの分析をスマートフォンで確認できるHogLiteというアプリを見つけました。ぜひ試してみてください！',
  reviewBeforeLink:
    'HogLiteをご利用いただきありがとうございます。このプロジェクトは',
  reviewAfterLink:
    'としてコミュニティに公開されています。より多くの方に届けるため、レビューにご協力いただけるとうれしいです。',
  noThanks: '今回はしない',
  leaveReview: 'レビューを書く',

  createApiKey: 'アカウントAPIキーを作成',
  createApiKeyStart: '下のボタンからアカウント設定を開いてください。',
  goToSettings: '設定を開く',
  createPersonalApiKey: '「+ Create personal API key」を押します',
  apiKeyLabelInstruction:
    '用途が分かるように、APIキーへ任意のラベルを付けます。',
  apiKeyScopesInstruction:
    'HogLiteを利用するには、APIキーに次の読み取り専用スコープが必要です：',
  apiKeyCopyInstruction:
    '一覧上部に新しいキーが表示されたら、すぐにコピーしてここへ貼り付けてください。キーを再表示することはできません。',

  developerTools: '開発者ツール',
  networkLogs: 'ネットワークログ',
  clientStore: 'クライアントストア',
  noLocalData: 'データがありません',
  localStorageError: 'ローカルストレージのデータを取得できませんでした',

  genericError: 'エラーが発生しました',
  checkPosthogStatus: 'PostHogの稼働状況を確認',
  networkError: 'ネットワークエラー',
  networkErrorDescription:
    'インターネット接続を確認して、もう一度お試しください。',
  authorizationFailed: '認証に失敗しました',
  authorizationFailedDescription:
    'APIキーが正しくありません。リージョンもご確認ください。',
  rateLimitExceeded: 'レート制限を超えました',
  rateLimitDescription:
    'PostHogのレート制限に達しました。しばらく待ってからもう一度お試しください。',
  posthogServerError:
    'PostHogからサーバーエラーが返されました。PostHog側の問題である可能性があります。',
  internalServerError: 'サーバーエラー',
  internalServerErrorDescription:
    '予期しないエラーが発生しました。時間をおいてもう一度お試しください。',
  updateAvailable: 'アップデートがあります',
  updateAvailableDescription:
    '新しいアップデートがあります。最新機能を利用するにはアプリを再読み込みしてください。',
  reloadNow: '今すぐ再読み込み',
  notNow: '後で',
  disableUpdateAlerts: 'アップデート通知を無効にする',
} satisfies Translations;

export default ja;
