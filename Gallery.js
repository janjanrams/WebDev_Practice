document.addEventListener("DOMContentLoaded", function() {
    var largeImage = document.getElementById('largeImage');
    var imgCarousel = document.getElementById('imgCarousel');
    var carouselRows = document.querySelectorAll('.carousel_row');
    var carouselRowImgs = document.querySelectorAll('.carousel_row img');

    function setCarouselHeight() {
        var largeImageHeight = largeImage.clientHeight;
        imgCarousel.style.height = largeImageHeight + 'px';

        carouselRows.forEach(function(row) {
            row.style.height = (largeImageHeight * 0.20) + 'px';
            row.style.padding = (largeImageHeight * 0.02) + 'px 0';
        });

        carouselRowImgs.forEach(function(img) {
            img.style.height = (largeImageHeight * 0.16) + 'px';
            img.style.gap = (largeImageHeight * 0.02) + 'px';
        });

        carouselRows.forEach(function(row) {
            row.style.gap = (largeImageHeight * 0.04) + 'px';
        });
    }

    // Function to handle radio button carousel
    function radio_btn() {
        var counter1 = 2;
        var first = document.querySelector('.carousel_row.first');
        var second = document.querySelector('.carousel_row.second');
        var third = document.querySelector('.carousel_row.third');
        var fourth = document.querySelector('.carousel_row.fourth');
        var fifth = document.querySelector('.carousel_row.fifth');

        setInterval(function() {
            // Update the marginLeft based on the counter1 value
            switch (counter1) {
                case 1:
                case 8:
                    first.style.marginLeft = '0';
                    second.style.marginLeft = '5%';
                    third.style.marginLeft = '0';
                    fourth.style.marginLeft = '-10%';
                    fifth.style.marginLeft = '5%';
                    break;
                case 2:
                case 7:
                    first.style.marginLeft = '-25%';
                    second.style.marginLeft = '-10%';
                    third.style.marginLeft = '-23%';
                    fourth.style.marginLeft = '-20%';
                    fifth.style.marginLeft = '-30%';
                    break;
                case 3:
                case 6:
                    first.style.marginLeft = '-40%';
                    second.style.marginLeft = '-35%';
                    third.style.marginLeft = '-43%';
                    fourth.style.marginLeft = '-35%';
                    fifth.style.marginLeft = '-45%';
                    break;
                case 4:
                case 5:
                    first.style.marginLeft = '-70%';
                    second.style.marginLeft = '-60%';
                    third.style.marginLeft = '-57%';
                    fourth.style.marginLeft = '-50%';
                    fifth.style.marginLeft = '-65%';
                    break;
            }

            // Check the corresponding radio button
            document.getElementById('radio' + counter1).checked = true;
            counter1++;

            if (counter1 > 8) {
                counter1 = 1;
            }
        }, 5000);
    }

    // Initialize carousel and set up resize event listener
    setCarouselHeight();
    radio_btn();

    window.onresize = function() {
        setCarouselHeight();
    };

    //Landscape Gallery Row 2 Buttons
    var Landscape_rightbtn = document.getElementById('Landscape_rightBtn');
    var Landscape_leftbtn = document.getElementById('Landscape_leffBtn');
    var Landscape = document.querySelector('.Limg_zone');
    var LandscapeCounter = 1;

    Landscape_rightbtn.addEventListener('click', function() {
        if (LandscapeCounter != 10) {
            LandscapeCounter++;
        }
        
        switch (LandscapeCounter) {
            case 1:
                Landscape.style.marginLeft = '0%';
                break;
            case 2:
                Landscape.style.marginLeft = '-100%';
                break;
            case 3:
                Landscape.style.marginLeft = '-200%';
                break;
            case 4:
                Landscape.style.marginLeft = '-300%';
                break;
            case 5:
                Landscape.style.marginLeft = '-400%';
                break;
            case 6:
                Landscape.style.marginLeft = '-500%';
                break;
            case 7:
                Landscape.style.marginLeft = '-600%';
                break;
            case 8:
                Landscape.style.marginLeft = '-700%';
                break;
            case 9:
                Landscape.style.marginLeft = '-800%';
                break;
            case 10:
                Landscape.style.marginLeft = '-900%';
                break;
        }
    });

    Landscape_leftbtn.addEventListener('click', function() {
        if (LandscapeCounter != 1) {
            LandscapeCounter--;
        }
        
        switch (LandscapeCounter) {
            case 1:
                Landscape.style.marginLeft = '0%';
                break;
            case 2:
                Landscape.style.marginLeft = '-100%';
                break;
            case 3:
                Landscape.style.marginLeft = '-200%';
                break;
            case 4:
                Landscape.style.marginLeft = '-300%';
                break;
            case 5:
                Landscape.style.marginLeft = '-400%';
                break;
            case 6:
                Landscape.style.marginLeft = '-500%';
                break;
            case 7:
                Landscape.style.marginLeft = '-600%';
                break;
            case 8:
                Landscape.style.marginLeft = '-700%';
                break;
            case 9:
                Landscape.style.marginLeft = '-800%';
                break;
            case 10:
                Landscape.style.marginLeft = '-900%';
                break;
        }
    });

    //Portrait Gallery Row 2 Buttons
    var Portrait_rightbtn = document.getElementById('Portrait_rightBtn');
    var Portrait_leftbtn = document.getElementById('Portrait_leffBtn');
    var Portrait = document.querySelector('.Pimg_zone');
    var PortraitCounter = 1;

    Portrait_rightbtn.addEventListener('click', function() {
        if (PortraitCounter != 8) {
            PortraitCounter++;
        }
        
        switch (PortraitCounter) {
            case 1:
                Portrait.style.marginLeft = '0%';
                break;
            case 2:
                Portrait.style.marginLeft = '-100%';
                break;
            case 3:
                Portrait.style.marginLeft = '-200%';
                break;
            case 4:
                Portrait.style.marginLeft = '-300%';
                break;
        }
    });

    Portrait_leftbtn.addEventListener('click', function() {
        if (Portrait != 1) {
            PortraitCounter--;
        }
        
        switch (PortraitCounter) {
            case 1:
                Portrait.style.marginLeft = '0%';
                break;
            case 2:
                Portrait.style.marginLeft = '-100%';
                break;
            case 3:
                Portrait.style.marginLeft = '-200%';
                break;
            case 4:
                Portrait.style.marginLeft = '-300%';
                break;
        }
    });
});
