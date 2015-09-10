require('./../css/style.less');

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
require('./views/Carrers');
require('./views/Journal');
require('./views/LetsTalk');
require('./views/Home');
require('./views/ProjectPlanner');

require('./ui/Button');
require('./ui/Input');
require('./ui/Grid');
require('./ui/GridItem');
require('./ui/Menu');
require('./ui/GridItemClone');
require('./ui/BottomPageLinks');
require('./ui/BottomPageLinkItem');
require('./ui/PageCover');

require('./ui/home/Slider');
require('./ui/home/SliderDot');
require('./ui/home/SliderItem');
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
require('./ui/carrers/WeAreAll');
require('./ui/carrers/JoinUsMessage');
require('./ui/carrers/JobList');
require('./ui/carrers/Job');
require('./ui/carrers/NoJobsAvailable');
require('./ui/community/Collage');
require('./ui/community/CollageQuote');
require('./ui/community/CollageImage');
require('./ui/journal/JournalPost');
require('./ui/project-planner/RangeSelector');
require('./ui/project-planner/ProjectPlannerStep1');
require('./ui/project-planner/ProjectPlannerStep2');
require('./ui/project-planner/ProjectPlannerStep3');
require('./ui/project-planner/ProjectPlannerStep4');
require('./ui/project-planner/ProjectPlannerStep5');
require('./ui/project-planner/ProjectPlannerStep6');

window.app = new window.EM.App();
window.app.initRouter();
