require('./../css/style.less');

window.jQuery = window.$ = require('jquery');
require('neon');
require('neon/stdlib');
require('./lib/widget');

require('./lib/namespace');
require('./App');

require('./views/PagesManager');
require('./views/WhatWeDo');
require('./views/CaseStudies');
require('./views/AboutUs');
require('./views/Community');
require('./views/Careers');
require('./views/Journal');
require('./views/LetsTalk');
require('./views/Home');

require('./ui/Button');
require('./ui/Input');
require('./ui/AttachFilesList');
require('./ui/AttachFile');
require('./ui/SpinnerBlocker');
require('./ui/Grid');
require('./ui/GridItem');
require('./ui/Menu');
require('./ui/GridItemClone');
require('./ui/BottomPageLinks');
require('./ui/BottomPageLinkItem');
require('./ui/PageCover');

require('./ui/PageLoader');
require('./ui/case-studies/CaseStudy');
require('./ui/about-us/gallery/GalleryManager');
require('./ui/about-us/gallery/GalleryItems');
require('./ui/about-us/gallery/GalleryItem');
require('./ui/about-us/gallery/GalleryThumbs');
require('./ui/about-us/gallery/GalleryThumb');
require('./ui/what-we-do/WhatWeDoCircle');
require('./ui/what-we-do/WhatWeDoDisciplines');
require('./ui/what-we-do/WhatWeDoDiscipline');
require('./ui/what-we-do/WhatWeDoOfferings');
require('./ui/what-we-do/WhatWeDoOffering');
require('./ui/careers/ImageStrip');
require('./ui/careers/WeAreAll');
require('./ui/careers/JoinUsMessage');
require('./ui/careers/JobList');
require('./ui/careers/Job');
require('./ui/careers/NoJobsAvailable');
require('./ui/community/Collage');
require('./ui/community/CollageQuote');
require('./ui/community/CollageImage');
require('./ui/journal/JournalPost');

require('./overlays/Overlay');
require('./overlays/project-planner/ProjectPlanner');
require('./overlays/project-planner/RangeSelector');
require('./overlays/project-planner/ProjectPlannerStep1');
require('./overlays/project-planner/ProjectPlannerStep2');
require('./overlays/project-planner/ProjectPlannerStep3');
require('./overlays/project-planner/ProjectPlannerStep4');
require('./overlays/project-planner/ProjectPlannerStep5');
require('./overlays/project-planner/ProjectPlannerStep6');
require('./overlays/general-application/GeneralApplication');
require('./overlays/general-application/GeneralApplicationStep');

window.app = new window.EM.App();
window.app.initRouter();
