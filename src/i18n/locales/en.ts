const en = {
  navInsights: 'Insights',
  navActivity: 'Activity',
  navExceptions: 'Exceptions',
  navSettings: 'Settings',

  welcomeTitle: 'Welcome, Friend',
  welcomeHeading: 'Welcome to HogLite!',
  welcomeIntroBeforeLink: 'HogLite is a fully ',
  welcomeOpenSource: 'open-source',
  welcomeIntroAfterLink:
    " PostHog client to view insights, events, and more, all from your phone. We're excited to have you on board!",
  getStarted: 'Get Started',
  exploreSampleData: 'Explore with Sample Data',

  apiKey: 'API Key',
  login: 'Login',
  howDoIGetThis: 'How do I get this?',
  doYouStoreMyApiKey: 'Do you store my API key?',
  apiKeyRequired: 'API Key is required',
  invalidApiKey: 'Invalid API Key',
  mustBeAString: 'Must be a string',

  dataRegion: 'Data Region',
  selectRegion: 'Select a region',
  unitedStates: 'United States',
  europeanUnion: 'European Union',
  customEndpoint: 'Custom Endpoint',
  continue: 'Continue',
  whatIsThis: 'What is this?',
  urlRequired: 'URL is required',
  validUrlRequired: 'Must be a valid URL',
  fieldRequired: 'Field is required',

  selectTimePeriod: 'Select time period',
  today: 'Today',
  yesterday: 'Yesterday',
  last24Hours: 'Last 24 hours',
  last7Days: 'Last 7 days',
  last30Days: 'Last 30 days',
  last90Days: 'Last 90 days',
  last180Days: 'Last 180 days',
  thisMonth: 'This month',
  yearToDate: 'Year to date',
  allTime: 'All time',

  selectDashboard: 'Select dashboard',
  reload: 'Reload',
  noInsightsFound: 'No insights found',
  tryChangingFilters: 'Try changing your filters, or reloading the page.',
  couldNotFetchActivity: 'Could not fetch activity',
  unsupportedInsightTitle: 'This insight is not yet supported',
  unsupportedInsightDescription:
    "Heads up! Something went wrong while loading this insight. Chances are, we don't support it yet. We're working on it!",
  insightFunnel: 'Insight Funnel',
  usersSuffix: ' Users',
  totalCount: 'Total Count',
  insightBreakdown: 'Insight Breakdown',
  insightHasNoData: 'This insight has no data yet.',
  conversionTime: 'Conversion Time',
  averageTime: 'Average Time',
  timeRange: '%{start} to %{end}',

  selectEvent: 'Select event',
  allEvents: 'All Events',
  filterTestUsers: 'Filter out internal and test users',
  noEventsFound: 'No events or exceptions found',
  eventColumn: 'EVENT',
  personColumn: 'PERSON',
  timeColumn: 'TIME',
  justNow: 'Just now',
  minutesAgo: '%{count}m ago',
  hoursAgo: '%{count}h ago',
  daysAgo: '%{count}d ago',
  secondsShort: '%{count}s',
  minutesShort: '%{count}m',
  hoursShort: '%{count}h',
  daysShort: '%{count}d',

  project: 'Project',
  selectProject: 'Select project',
  organization: 'Organization',
  selectOrganization: 'Select organization',
  otherSettings: 'Other Settings',
  account: 'Account',
  accountDescription: 'View your current PostHog account',
  appearance: 'Appearance',
  appearanceDescription: 'Change the appearance of the app',
  contribute: 'Contribute',
  contributeDescription: "We're open source! Contribute to our project",
  reportBug: 'Report Bug',
  reportBugDescription: 'Found a bug? Want a feature? Let us know!',
  shareWithFriends: 'Share with Friends',
  shareWithFriendsDescription: 'Love HogLite? Share it with your friends!',
  debug: 'Debug',
  debugDescription: 'View and enable debugging features',
  logout: 'Logout',
  logoutTitle: 'Are you sure?',
  logoutMessage:
    'Are you sure you want to logout? You will need to re-enter your API key to login again.',
  cancel: 'Cancel',
  nevermind: 'Nevermind',

  yourAccount: 'Your Account',
  demoMode: "You're in Demo Mode",
  email: 'Email',
  firstName: 'First Name',
  lastName: 'Last Name',

  theme: 'Theme',
  selectTheme: 'Select theme',
  light: 'Light',
  dark: 'Dark',
  appIcon: 'App Icon',
  spaceHog: 'Space Hog',
  happyHog: 'Happy Hog',
  angryHog: 'Angry Hog',
  nerdyHog: 'Nerdy Hog',
  blue: 'Blue',
  orange: 'Orange',
  cowboyHog: 'Cowboy Hog',
  builderHog: 'Builder Hog',

  currentAppVersion: 'Current App Version',
  currentAppVersionDescription:
    'The version of the app you are currently using. Formatted as "binary version - update version"',
  developerMode: 'Developer Mode',
  developerModeDescription:
    'Press three fingers on the screen to view the local state, and network logs.',
  updateAlertsEnabled: 'Update Alerts Enabled?',
  updateAlertsDescription:
    'Toggle whether you receive notifications when OTA updates are available.',

  activityScreenTitle: 'The Activity Screen',
  activityScreenIntro:
    "Welcome to the Activity Screen! I'd like to share some tips on how to use it!",
  activityGearTip:
    'Click the "Gear" icon in the top left of the table to configure columns, display mode, and more!',
  activityRowTip:
    'Click anywhere on any row to open all of the properties of a specific event.',
  closeInstructions: 'Thanks! Close instructions',
  insightsScreenTitle: 'The Insights Screen',
  insightsScreenIntro:
    "Welcome to the Insights Screen! I'd like to share some tips on how to use it!",
  insightsDashboardTip:
    'Switch between all of the dashboards for your project by clicking the dropdown at the top.',
  insightsSupportTip:
    "We currently support viewing aggregations, funnels, conversion time funnels, and breakdowns. Want to view an insight we don't yet support?",
  requestFeature: 'Request a new feature',
  exceptionsScreenTitle: 'The Exceptions Screen',
  exceptionsScreenIntro:
    "Welcome to the shiny new exceptions screen! I'd like to share some tips on how to use it!",
  exceptionsTrackingTip:
    'PostHog has recently introduced exception tracking, and now, you can manage your events and your exceptions, all in one place!',
  exceptionRowTip:
    'Click anywhere on any row to open all of the properties of a specific exception.',

  configureEventsTable: 'Configure Events Table',
  displayMode: 'Display Mode',
  selectDisplayMode: 'Select display mode',
  full: 'Full',
  fullDescription:
    'Gives each column more space to breathe, but may require scrolling horizontally',
  compact: 'Compact',
  compactDescription:
    'Fit all data in the width of the screen without scrolling horizontally',
  visibleColumns: 'Visible Columns',
  event: 'Event',
  eventDescription: 'The name of the event that occurred',
  person: 'Person',
  personDescription: 'The person who performed the action',
  urlScreen: 'URL / Screen',
  urlScreenDescription: 'The url/screen where the action occurred',
  timestamp: 'Timestamp',
  timestampDescription: 'The time when the activity occurred',
  save: 'Save',

  dataRegionQuestion: "What's a data region?",
  dataRegionDescription:
    'The data region is the area where your PostHog data is stored. See the below chart to understand which data region is best for you.',
  usRegionFast: 'Faster if you and your users are based in the US',
  usRegionCompliance: 'Easier to comply with some US regulations',
  usRegionHosting: 'Hosted in Virginia, USA',
  euRegionFast: 'Faster if you and your users are based in Europe',
  euRegionCompliance: 'Keeps data in the EU to comply with GDPR requirements',
  euRegionHosting: 'Hosted in Frankfurt, Germany',
  customRegionDescription:
    'Only use if your organization hosts their own PostHog instance on their own domain',
  dataSecurityTitle: 'No, we store nothing!',
  dataSecurityDescription:
    "We don't store any data about you. In-fact, this app doesn't even have a backend! Your API key is stored locally on your device, and this app only communicates directly with the PostHog API.",

  hiFriend: 'Hi Friend!',
  sharePrompt:
    'Enoying the app? Know a friend who uses PostHog? Share HogLite with them and help us grow!',
  shareNow: 'Share Now!',
  shareMessage:
    'Hey! I found this cool app called HogLite that helps me view my PostHog analytics on the go. You should check it out too!',
  reviewBeforeLink: "I hope you've been enjoying HogLite! This project is ",
  reviewAfterLink:
    ' for the community, and I would really appreciate it if you could take a second to leave us a review. It helps us reach more people like you!',
  noThanks: 'No Thanks',
  leaveReview: 'Leave a Review',

  createApiKey: 'Create an account API Key',
  createApiKeyStart:
    'Start by navigating to your account settings by clicking the button below.',
  goToSettings: 'Go to settings',
  createPersonalApiKey: 'Click "+ Create personal API key"',
  apiKeyLabelInstruction:
    "Give your key a label - this is just for you, usually to describe the key's purpose.",
  apiKeyScopesInstruction:
    'Choose the scopes for your key. For this client to work, the API key needs to have the following scopes (READONLY):',
  apiKeyCopyInstruction:
    "At the top of the list, you should see your brand new key. Immediately copy its value and paste it here, as you'll never be able to see it again.",

  developerTools: 'Developer Tools',
  networkLogs: 'Network Logs',
  clientStore: 'Client Store',
  noLocalData: 'No data found',
  localStorageError: 'Could not fetch local storage data',

  genericError: 'An error occurred',
  checkPosthogStatus: "Check PostHog's Status",
  networkError: 'Network Error',
  networkErrorDescription:
    'Please check your internet connection and try again.',
  authorizationFailed: 'Authorization Failed',
  authorizationFailedDescription: 'Invalid API key. Maybe the wrong region?',
  rateLimitExceeded: 'Rate Limit Exceeded',
  rateLimitDescription:
    'PostHog has rate limits in place that we cannot control. Please wait before trying again.',
  posthogServerError:
    "Oh No! PostHog returned a server error. This is likely a bug on PostHog's end.",
  internalServerError: 'Internal Server Error',
  internalServerErrorDescription:
    'An unexpected error occurred. Please try again later.',
  updateAvailable: 'Update Available',
  updateAvailableDescription:
    'A new update is available. Reload the app now to get the latest features.',
  reloadNow: 'Reload Now',
  notNow: 'Not Now',
  disableUpdateAlerts: 'Disable update alerts',
} as const;

export type TranslationKey = keyof typeof en;
export type Translations = Record<TranslationKey, string>;

export default en;
