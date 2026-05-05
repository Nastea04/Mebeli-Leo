<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <title>Мебели Лео</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="stylePortfolio.css">

</head>
<body>

<header>
    <div class="left">
        <img src="logo.png">
        <p>Мебели Лео ЕООД</p>
    </div>
   
    <div class="right">
        <a href="index.html">За нас</a>
        <a href="portfolio.html">Портфолио</a>
        <a href="ask.html">Запитване</a>
        <a href="contacts.html">Контакти</a>
    </div>
</header>

<section class="portfolio-container">
    <aside class="side-menu">
    <button class="menu-link active" data-filter="all">Всички</button>
    <button class="menu-link" data-filter="kitchen">Кухни</button>
    <button class="menu-link" data-filter="bedroom">Спални</button>
    <button class="menu-link" data-filter="livingroom">Всекидневни</button>
    <button class="menu-link" data-filter="bathroom">Бани</button>
    <button class="menu-link" data-filter="corridor">Антрета</button>
    <button class="menu-link" data-filter="cabinet">Гардероби</button>
    <button class="menu-link" data-filter="establishment">Търговски обекти</button>
</aside>

<div class="bento-grid" id="portfolio-grid"></div>
</section>

<script src="scriptPortfolio.js"></script>

<div id="lightbox" class="lightbox">
    <span class="close-lightbox">&times;</span>
    <button class="lightbox-arrow prev">&#10094;</button>
    <div class="lightbox-content">
        <img id="lightbox-img" src="" alt="">
    </div>
    <button class="lightbox-arrow next">&#10095;</button>
</div>
</body>
</html>
