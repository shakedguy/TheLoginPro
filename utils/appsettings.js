import { AppConfiguration } from 'read-appsettings-json';

const temp = JSON.stringify(AppConfiguration.Setting());
const AppSettings = JSON.parse(temp);

export default AppSettings;
