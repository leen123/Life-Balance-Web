const AppConsts = {
  appPath: '/',
  appName: 'Circulife',
  pageLoadTime: new Date(),
  defaultLanguage: 'app-language',
  primaryColor: '#6562FC',

  apiError: 'return catch error',

  dateTimeFormat: 'DD/MM/YYYY h:mm a',
  timeFormat: 'h:mm a',
  dayMonthFormat: 'DD/MM',
  dateFormat: 'DD/MM/YYYY',
  uploadDateFormat: 'YYYY/MM/DD',
  dateTimeDevExtremFormat: 'dd/MM/yyyy HH:mm a',
  dateDevExtremFormat: 'dd/MM/yyyy',
  dateTimeFileNameFormat: 'YYYYMMDDHHmmss',

  savedFilesUrl: 'https://api.circulife.app/uploads/',
  publicUrl: process.env.PUBLIC_URL,
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
  remoteServiceUploadUrl: process.env.REACT_APP_REMOTE_SERVICE_UPLOAD_URL,
};

export default AppConsts;
