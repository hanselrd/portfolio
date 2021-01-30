export interface I18nTable {
  common: {
    language: string;
    developmentVersion: string;
  };
  pages: {
    "index": {
      title: string;
    };
    "home": {
      title: string;
    };
    "projectsIndex": {
      title: string;
      description: string;
    };
    "projectsSlug": {
      namespace: string;
      title: string;
    };
    "resume": {
      title: string;
    };
    "about": {
      title: string;
    };
    "contact": {
      title: string;
    };
    "404": {
      title: string;
    };
    "error": {
      title: string;
    };
  };
}
