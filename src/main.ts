import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import * as Backend from 'i18next-xhr-backend';
import * as LngDetector from "i18next-browser-languagedetector";
import * as moment from 'moment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-i18n', (instance) => {
      // register backend plugin
      instance.i18next.use(Backend)
        .use(LngDetector);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      // return instance.setup({
      //   backend: {                                  // <-- configure backend settings
      //     loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
      //   },
      //   lng : 'en',
      //   attributes : ['t','i18n'],
      //   fallbackLng : 'en',
      //   debug : false
      // });
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: "./locales/{{lng}}/{{ns}}.json", // <-- XHR settings for where to get the files from
        },
        detection: {
          order: ["localStorage", "cookie", "navigator"],
          lookupCookie: "i18next",
          lookupLocalStorage: "i18nextLng",
          caches: ["localStorage", "cookie"]
        },
        interpolation : {
          format: function(value, format, lng) {
            if (!value) return; // no value so then return
            if (value instanceof Date) return moment(value).format(format); // already date object so just do format
            // remove string [Etc/UTC] from value, can't convert to valid javascript date with it in.
            let index = value.indexOf("[Etc/UTC]");
            if (index != -1) {
              value = value.substr(0, index);
            }
            // return moment(Date.parse(value)).format(format); // convert to date first then format
            return value;
          }
        },
        fallbackLng: "en",
        fallbackNS: "translation",
        ns: ["translation"],
        defaultNs: "translation",
        attributes: ["t", "i18n"],
        debug: false
      });
    });

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
