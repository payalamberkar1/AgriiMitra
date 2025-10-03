document.addEventListener('DOMContentLoaded', function() {

    let isLoggedIn = false;
    let currentUser = null;

    // --- Page Navigation ---
    const pages = document.querySelectorAll('main > div');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.getElementById('mobile-menu');

    // Make showPage and logout globally accessible for HTML onclick attributes
    window.showPage = function(pageId) {
        // Special handling for recommendation page based on login state
        if (pageId === 'recommendation' && !isLoggedIn) {
            document.getElementById('login-signup-section').classList.remove('hidden');
            document.getElementById('recommendation-system-section').classList.add('hidden');
            document.getElementById('signup-form-container').classList.remove('hidden');
            document.getElementById('login-form-container').classList.add('hidden');
        } else if (pageId === 'recommendation' && isLoggedIn) {
            document.getElementById('login-signup-section').classList.add('hidden');
            document.getElementById('recommendation-system-section').classList.remove('hidden');
        }

        pages.forEach(page => {
            if (page.id === `page-${pageId}`) {
                page.classList.remove('hidden-page');
                setTimeout(() => {
                    const fadeInContent = page.querySelector('.fade-in');
                    if(fadeInContent) fadeInContent.classList.add('visible');
                }, 50);
            } else {
                page.classList.add('hidden-page');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check both desktop and mobile nav links
            if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
                link.classList.add('active');
            }
        });

        mobileMenu.classList.add('hidden');
        window.scrollTo(0, 0);

        // FIX: Ensure charts initialize when the Automation page is shown
        if (pageId === 'automation') {
            createAutomationCharts();
        }
    }
    
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- Home Page Slider ---
    const sliderItems = document.querySelectorAll('.slider-item');
    if (sliderItems.length > 0) {
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        const dotsContainer = document.getElementById('slider-dots');
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 5000);

        sliderItems.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full bg-white/50 transition hover:bg-white';
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        const sliderDots = dotsContainer.querySelectorAll('button');

        function goToSlide(slideIndex) {
            currentSlide = (slideIndex + sliderItems.length) % sliderItems.length;
            sliderItems.forEach((slide, index) => {
                slide.classList.toggle('opacity-100', index === currentSlide);
                slide.classList.toggle('opacity-0', index !== currentSlide);
            });
            sliderDots.forEach((dot, index) => {
                dot.classList.toggle('bg-white', index === currentSlide);
                dot.classList.toggle('bg-white/50', index !== currentSlide);
            });
        }
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        nextButton.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevButton.addEventListener('click', () => { prevSlide(); resetInterval(); });
        goToSlide(0);
    }

    // --- Fade-in on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // --- Crop Study Data ---
    const cropData = {
        tomato: {
            name: 'Tomato',
            stages: [ { name: 'Planting', days: '0-5', img: 'https://placehold.co/800x500/e0f2fe/0c4a6e?text=1.+Planting' }, { name: 'Germination', days: '5-12', img: 'https://placehold.co/800x500/dcfce7/15803d?text=2.+Germination' }, { name: 'Vegetative', days: '12-30', img: 'https://placehold.co/800x500/dcfce7/15803d?text=3.+Vegetative+Growth' }, { name: 'Flowering', days: '30-50', img: 'https://placehold.co/800x500/fefce8/a16207?text=4.+Flowering' }, { name: 'Harvest', days: '50+', img: 'https://placehold.co/800x500/fee2e2/991b1b?text=5.+Harvest' } ],
            info: 'Tomatoes are nutrient-hungry plants that thrive in aeroponic systems. They require high levels of potassium and phosphorus during their flowering and fruiting stages. Good support or trellising is essential as they grow.',
            risks: 'Common issues include blossom end rot (a sign of calcium deficiency) and pests like spider mites. Ensuring good air circulation is key to preventing fungal diseases like powdery mildew.',
            video: 'https://www.youtube.com/embed/5i0s_R8Q2zQ'
        },
        lettuce: {
            name: 'Lettuce',
            stages: [ { name: 'Planting', days: '0-3', img: 'images/lettuce-planting.jpg' }, { name: 'Germination', days: '3-7', img: 'images/lettuce-Germination.jpg' }, { name: 'Seedling', days: '7-15', img: 'images/lettuce-seedling.jpg' }, { name: 'Vegetative', days: '15-40', img: 'images/lettuce-vegetative.jpg' }, { name: 'Harvest', days: '40+', img: 'images/lettuce-harvest.jpg' }, ],
            info: 'Lettuce is a perfect crop for beginners in aeroponics due to its rapid growth cycle. It prefers a balanced nutrient solution with plenty of nitrogen to encourage lush leaf growth. Maintain a pH between 6.0 and 7.0.',
            risks: 'Tip burn, caused by calcium deficiency or poor transpiration, is a common problem. Root rot can occur if the water temperature gets too high. Watch out for aphids.',
            video: 'https://www.youtube.com/embed/g_p8h424-rI'
        },
        strawberry: {
            name: 'Strawberry',
            stages: [ { name: 'Planting', days: '0-10', img: 'https://placehold.co/800x500/fce7f3/831843?text=1.+Planting+Runner' }, { name: 'Leaf Growth', days: '10-25', img: 'https://placehold.co/800x500/fce7f3/831843?text=2.+Leaf+Growth' }, { name: 'Flowering', days: '25-45', img: 'https://placehold.co/800x500/fce7f3/831843?text=3.+Flowering' }, { name: 'Harvest', days: '45+', img: 'https://placehold.co/800x500/fce7f3/831843?text=4.+Harvest' } ],
            info: 'Strawberries flourish in aeroponic towers. Use a nutrient solution formulated for flowering and fruiting. If growing indoors, gentle hand-pollination might be needed for a bountiful harvest.',
            risks: 'They are susceptible to powdery mildew, so good air circulation is crucial. Spider mites can also be a problem; inspect the undersides of leaves regularly.',
            video: 'https://www.youtube.com/embed/zUYxxS4hJZM'
        },
        potato: {
            name: 'Potato',
            stages: [ { name: 'Planting', days: '0', img: 'images/potato-planting.jpg' }, { name: 'Sprouting', days: '0-10', img: 'images/potato-sprouting.jpg' }, { name: 'Vegetative', days: '10-30', img: 'images/potato-vegetative.jpg' }, { name: 'Tuber Bulking', days: '30-70', img: 'images/potato-tuberbulking.jpg' }, { name: 'Harvest', days: '70-100+', img: 'images/potato-harveest.jpg' } ],
            info: 'Growing potatoes aeroponically is highly efficient and clean. The system allows for easy monitoring of tuber growth. A nutrient solution higher in potassium is needed during the tuber bulking phase to encourage larger yields.',
            risks: 'Potatoes are susceptible to blight and scab. Maintaining a sterile environment is critical in aeroponics to prevent these diseases from taking hold. Ensure good ventilation to keep foliage dry.',
            video: 'https://www.youtube.com/embed/vmaDw0I4hP0'
        },
        pepper: {
            name: 'Bell Pepper',
            stages: [ { name: 'Planting', days: '0-7', img: 'https://placehold.co/800x500/e0f2fe/0c4a6e?text=1.+Planting' }, { name: 'Germination', days: '7-14', img: 'https://placehold.co/800x500/dcfce7/15803d?text=2.+Germination' }, { name: 'Vegetative', days: '14-40', img: 'https://placehold.co/800x500/dcfce7/15803d?text=3.+Vegetative' }, { name: 'Flowering', days: '40-60', img: 'https://placehold.co/800x500/fefce8/a16207?text=4.+Flowering' }, { name: 'Harvest', days: '60+', img: 'https://placehold.co/800x500/fee2e2/991b1b?text=5.+Harvest' } ],
            info: 'Bell peppers thrive in the warm, consistent environment of an aeroponic system. They need support as they grow heavy with fruit. A balanced nutrient mix is fine until flowering, then switch to a mix with higher phosphorus and potassium.',
            risks: 'Aphids and spider mites can be an issue. Blossom end rot can occur due to calcium deficiency or inconsistent watering cycles. Maintain a consistent misting schedule.',
            video: 'https://www.youtube.com/embed/gB80W1i2_so'
        }
    };

    const cropSelector = document.getElementById('crop-selector');
    const cropContainer = document.getElementById('crop-details-container');

    function displayCropInfo(cropKey) {
        const data = cropData[cropKey];
        const stagesHtml = data.stages.map((stage, index) => `
            <div class="growth-stage-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <p class="font-bold text-lg">${stage.name}</p>
                <p class="text-sm text-gray-500">Days: ${stage.days}</p>
            </div>
        `).join('');
        cropContainer.innerHTML = `
            <div class="text-center mb-8">
                <img id="crop-stage-image" src="${data.stages[0].img}" alt="${data.stages[0].name}" class="rounded-xl shadow-lg mx-auto transition-opacity duration-500 w-full object-cover max-h-[500px]">
            </div>
            <div class="flex flex-wrap justify-center border-y my-6">
                ${stagesHtml}
            </div>
            <div class="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t">
                <div>
                    <h4 class="font-bold text-2xl mb-3 text-green-800">Growth Information</h4>
                    <p class="text-gray-700 leading-relaxed">${data.info}</p>
                    <h4 class="font-bold text-2xl mt-6 mb-3 text-amber-600">Common Risks & Prevention</h4>
                    <p class="text-gray-700 leading-relaxed">${data.risks}</p>
                </div>
                <div class="aspect-w-16 aspect-h-9">
                     <iframe class="w-full h-full rounded-lg shadow-md" src="${data.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        const stageItems = cropContainer.querySelectorAll('.growth-stage-item');
        const stageImage = document.getElementById('crop-stage-image');

        stageItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = item.getAttribute('data-index');
                stageItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                stageImage.style.opacity = '0';
                setTimeout(() => {
                     stageImage.src = data.stages[index].img;
                     stageImage.alt = data.stages[index].name;
                     stageImage.style.opacity = '1';
                }, 400);
            });
        });
    }
    cropSelector.addEventListener('change', (e) => displayCropInfo(e.target.value));

    // --- New Home Gardening Planner Logic ---
    const gardenPlannerForm = document.getElementById('garden-planner-form');
    const addGardenCropBtn = document.getElementById('add-garden-crop-btn');
    const gardenCropInputs = document.getElementById('garden-crop-inputs');
    const gardenPlanResults = document.getElementById('garden-plan-results');
    const allocModeToggle = document.getElementById('alloc-mode-toggle');
    const remainingLandText = document.getElementById('remaining-land-text');
    
    const gardenCropDetails = {
        tomato: { name: 'Tomatoes', water: 0.8, days: 70, pest: 'Neem Oil (5%)', profit: 2.5, icon: '🍅' },
        lettuce: { name: 'Lettuce', water: 0.5, days: 50, pest: 'Soapy Water', profit: 3.0, icon: '🥬' },
        pepper: { name: 'Peppers', water: 0.7, days: 80, pest: 'Neem Oil (5%)', profit: 2.0, icon: '🌶️' },
        potato: { name: 'Potatoes', water: 0.6, days: 90, pest: 'Crop Rotation', profit: 1.5, icon: '🥔' },
        strawberry: { name: 'Strawberries', water: 1.0, days: 60, pest: 'Beneficial Insects', profit: 5.0, icon: '🍓' },
    };

    function createGardenCropInput() {
        const div = document.createElement('div');
        div.className = 'grid grid-cols-6 gap-2 items-center';
        div.innerHTML = `
            <select class="garden-crop-select col-span-3 w-full p-2 border-0 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-green-400">
                <option class="text-black" value="tomato">Tomato</option>
                <option class="text-black" value="lettuce">Lettuce</option>
                <option class="text-black" value="pepper">Bell Pepper</option>
                <option class="text-black" value="potato">Potato</option>
                <option class="text-black" value="strawberry">Strawberry</option>
            </select>
            <input type="number" class="garden-crop-value col-span-2 w-full p-2 border-0 rounded-md bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400" placeholder="Area">
            <span class="text-white font-semibold text-center value-unit">sq ft</span>
        `;
        gardenCropInputs.appendChild(div);
    }

    function updateRemainingLand() {
        const totalArea = parseFloat(document.getElementById('garden-land-area').value) || 0;
        if (totalArea === 0) {
            remainingLandText.textContent = '';
            return;
        }
        const isPercentMode = allocModeToggle.checked;
        let usedValue = 0;
        document.querySelectorAll('.garden-crop-value').forEach(input => {
            usedValue += parseFloat(input.value) || 0;
        });
        
        if (isPercentMode) {
            const remainingPercent = 100 - usedValue;
            remainingLandText.textContent = `Remaining: ${remainingPercent.toFixed(1)}%`;
            remainingLandText.classList.toggle('text-red-500', remainingPercent < 0);
        } else {
            const remainingArea = totalArea - usedValue;
             remainingLandText.textContent = `Remaining: ${remainingArea.toFixed(1)} sq ft`;
             remainingLandText.classList.toggle('text-red-500', remainingArea < 0);
        }
    }
    
    allocModeToggle.addEventListener('change', () => {
        const isPercentMode = allocModeToggle.checked;
        document.getElementById('alloc-mode-label').textContent = isPercentMode ? 'Percentage (%)' : 'Area (sq ft)';
        document.querySelectorAll('.value-unit').forEach(span => span.textContent = isPercentMode ? '%' : 'sq ft');
        updateRemainingLand();
    });
    gardenPlannerForm.addEventListener('input', updateRemainingLand);
    addGardenCropBtn.addEventListener('click', createGardenCropInput);
    
    gardenPlannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const totalArea = parseFloat(document.getElementById('garden-land-area').value) || 0;
        if (totalArea <= 0) { alert("Please enter a total land area."); return; }

        const crops = [];
        const isPercentMode = allocModeToggle.checked;
        let totalUsed = 0;

        document.querySelectorAll('#garden-crop-inputs > div').forEach(row => {
            const key = row.querySelector('.garden-crop-select').value;
            const value = parseFloat(row.querySelector('.garden-crop-value').value) || 0;
            if(value <= 0) return;
            
            const area = isPercentMode ? (totalArea * value) / 100 : value;
            totalUsed += area;
            crops.push({ key, area, data: gardenCropDetails[key] });
        });
        
        let totalValueCheck = isPercentMode ? (totalUsed / totalArea) * 100 : totalUsed;
        if (isPercentMode && totalValueCheck > 100.1) { alert("Total percentage cannot exceed 100%."); return;}
        if (!isPercentMode && totalUsed > totalArea) { alert("Total allocated area cannot exceed the total land area."); return; }

        // Render Results
        gardenPlanResults.classList.remove('hidden');
        
        // 1. Summary
        const summaryEl = document.getElementById('garden-input-summary');
        let summaryHTML = `<strong>Total Area:</strong> ${totalArea} sq ft | `;
        crops.forEach(c => {
            summaryHTML += `<strong>${c.data.name}:</strong> ${c.area.toFixed(1)} sq ft (${((c.area / totalArea) * 100).toFixed(0)}%) | `;
        });
        const unusedLand = totalArea - totalUsed;
        if(unusedLand > 0.1) summaryHTML += `<strong>Unused:</strong> ${unusedLand.toFixed(1)} sq ft`;
        summaryEl.innerHTML = summaryHTML;

        // 2. SVG Plot
        const plotEl = document.getElementById('garden-plot-container');
        let svgHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs>`;
        // Define patterns
        for(const key in gardenCropDetails){
             svgHTML += `<pattern id="pattern-${key}" patternUnits="userSpaceOnUse" width="10" height="10"><text x="1" y="8" font-size="8">${gardenCropDetails[key].icon}</text></pattern>`;
        }
        svgHTML += `</defs>`;

        let xOffset = 0;
        crops.forEach(c => {
            const width = (c.area / totalArea) * 100;
            svgHTML += `<rect x="${xOffset}" y="0" width="${width}" height="100" fill="url(#pattern-${c.key})" stroke="#5d4037" stroke-width="0.5" />`;
            // NOTE: The random color generation will make the plot change color on every submission, which is fine for visualization.
            svgHTML += `<rect x="${xOffset}" y="0" width="${width}" height="100" fill="hsl(${Math.random() * 20 + 25}, 50%, 40%, 0.5)" />`;
            svgHTML += `<text x="${xOffset + width/2}" y="45" font-size="5" text-anchor="middle" fill="white" font-weight="bold">${c.data.name.toUpperCase()}</text>`;
            svgHTML += `<text x="${xOffset + width/2}" y="55" font-size="4" text-anchor="middle" fill="white">${c.area.toFixed(0)} SQ FT</text>`;
            xOffset += width;
        });
        svgHTML += `</svg>`;
        plotEl.innerHTML = svgHTML;

        // 3. Key Info
        const infoEl = document.getElementById('garden-key-info');
        let totalWater = 0, totalProfit = 0;
        let growingDays = new Set();
        let pesticides = new Set();
        crops.forEach(c => {
            totalWater += c.area * c.data.water;
            totalProfit += c.area * c.data.profit;
            growingDays.add(`${c.data.name}: ${c.data.days} days`);
            pesticides.add(c.data.pest);
        });
        infoEl.innerHTML = `
            <p><strong>💧 Water Needed:</strong> ~${totalWater.toFixed(1)} gallons/week</p>
            <p><strong>📅 Growing Days:</strong> ${Array.from(growingDays).join(', ')}</p>
            <p><strong>🐛 Pesticides:</strong> ${Array.from(pesticides).join(', ')}</p>
            <p><strong>💰 Est. Profit:</strong> $${totalProfit.toFixed(2)} per season</p>
            <p><strong>🏞️ Unused Land:</strong> ${unusedLand.toFixed(1)} sq ft</p>
        `;
    });
    
    // --- Automation Page Charts ---
    function createAutomationCharts() {
        // Only proceed if the canvas elements exist
        const nutrientChartCanvas = document.getElementById('nutrientChart');
        const environmentChartCanvas = document.getElementById('environmentChart');

        if (nutrientChartCanvas && environmentChartCanvas) {
            // Check if charts have already been created (Chart.js doesn't like re-creating on the same canvas)
            if (nutrientChartCanvas.chart) { nutrientChartCanvas.chart.destroy(); }
            if (environmentChartCanvas.chart) { environmentChartCanvas.chart.destroy(); }

            // Create Nutrient Chart
            nutrientChartCanvas.chart = new Chart(nutrientChartCanvas.getContext('2d'), { 
                type: 'doughnut', 
                data: { labels: ['Nutrient A', 'Nutrient B', 'Water'], datasets: [{ data: [30, 20, 50], backgroundColor: ['#34d399', '#60a5fa', '#3b82f6'] }] }, 
                options: { responsive: true, plugins: { legend: { position: 'top' } } } 
            });

            // Create Environment Chart
            environmentChartCanvas.chart = new Chart(environmentChartCanvas.getContext('2d'), { 
                type: 'bar', 
                data: { labels: ['Temp (°F)', 'Humidity (%)'], datasets: [{ label: 'Live Reading', data: [72, 65], backgroundColor: ['#fb923c', '#60a5fa'], maxBarThickness: 50 }] }, 
                options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } } 
            });
            
            // Re-attach light intensity listener
            document.getElementById('light-intensity').addEventListener('input', (e) => { document.getElementById('light-value').innerText = `${e.target.value}%`; });
        }
    }
    
    // --- Authentication & Recommendation Page Logic ---
    const loginSignupSection = document.getElementById('login-signup-section');
    const recommendationSystemSection = document.getElementById('recommendation-system-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-form-container');
    const signupContainer = document.getElementById('signup-form-container');
    const userInfo = document.getElementById('user-info');
    const userNameEl = document.getElementById('user-name');
    const loginNavLink = document.getElementById('login-nav-link');
    const mobileAuthLinks = document.getElementById('mobile-auth-links');


    function updateNavbar() {
        if(isLoggedIn) {
            loginNavLink.classList.add('hidden');
            userInfo.classList.remove('hidden');
            userInfo.classList.add('flex');
            userNameEl.textContent = `Hi, ${currentUser.firstName}`;
            mobileAuthLinks.innerHTML = `<a onclick="logout()" class="block py-2 font-semibold text-red-600">Logout</a>`;
        } else {
            loginNavLink.classList.remove('hidden');
            userInfo.classList.add('hidden');
            userInfo.classList.remove('flex');
             mobileAuthLinks.innerHTML = `<a onclick="showPage('recommendation')" class="block py-2 nav-link">Get Recommendation</a>`;
        }
    }

    window.logout = function() {
        isLoggedIn = false;
        currentUser = null;
        updateNavbar();
        showPage('home');
    }

    showSignupBtn.addEventListener('click', (e) => { e.preventDefault(); loginContainer.classList.add('hidden'); signupContainer.classList.remove('hidden'); });
    showLoginBtn.addEventListener('click', (e) => { e.preventDefault(); signupContainer.classList.add('hidden'); loginContainer.classList.remove('hidden'); });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;
        currentUser = { firstName: document.getElementById('first-name').value };
        updateNavbar();
        showPage('recommendation');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;
        const email = document.getElementById('login-email').value;
        // Basic example of getting a name from an email for display
        currentUser = { firstName: email.split('@')[0] };
        updateNavbar();
        showPage('recommendation');
    });

    const recommendationForm = document.getElementById('recommendation-form');
    const recommendationResult = document.getElementById('recommendation-result');
    const recommendationData = {
        potato: { images: ['https://images.unsplash.com/photo-1590165482096-7d033f9933d8?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1571778267239-6585d033b934?q=80&w=1974&auto=format&fit=crop'], desc: 'A versatile tuber that grows well in cooler climates with moderate rainfall. Prefers well-drained loamy soil.', idealTemp: [15, 20], idealSoil: ['loamy', 'sandy'] },
        tomato: { images: ['https://images.unsplash.com/photo-1607305387299-a3d961cf3462?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1561136594-7247da06a12b?q=80&w=1974&auto=format&fit=crop'], desc: 'Thrives in warm and sunny conditions. Requires consistent moisture and well-drained, nutrient-rich loamy soil.', idealTemp: [21, 27], idealSoil: ['loamy', 'black'] },
        pepper: { images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526346934512-1a8a4768b752?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1601648764658-cf37e8c8ce68?q=80&w=1974&auto=format&fit=crop'], desc: 'Loves heat and sun. Prefers warm temperatures and moderate rainfall with loamy or sandy soils.', idealTemp: [24, 30], idealSoil: ['sandy', 'loamy'] },
        lettuce: { images: ['https://images.unsplash.com/photo-1550482329-8ea504a50b9b?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1534948216013-18a2a704a5f3?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1629117180474-80327464c8d5?q=80&w=1974&auto=format&fit=crop'], desc: 'A cool-weather crop that grows quickly. It prefers loamy soil and consistent moisture.', idealTemp: [15, 21], idealSoil: ['loamy', 'clay'] },
        strawberry: { images: ['https://images.unsplash.com/photo-1587393855524-7ab1f96a9263?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526375549225-5c5448378565?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1587467634327-e435856b3543?q=80&w=1974&auto=format&fit=crop'], desc: 'Prefers milder temperatures and well-drained, sandy soil. Requires plenty of sunlight.', idealTemp: [18, 24], idealSoil: ['sandy'] }
    };

    recommendationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const temp = parseFloat(document.getElementById('rec-temp').value);
        const soil = document.getElementById('rec-soil').value;
        if (isNaN(temp)) { alert("Please enter a valid temperature."); return; }

        let scores = {};
        for (const crop in recommendationData) {
            scores[crop] = 0;
            const data = recommendationData[crop];
            // Score temperature
            if (temp >= data.idealTemp[0] && temp <= data.idealTemp[1]) {
                scores[crop] += 2; // Perfect match
            } else if (Math.abs(temp - (data.idealTemp[0] + data.idealTemp[1])/2) < 5) {
                scores[crop] += 1; // Close match
            }
            // Score soil
            if (data.idealSoil.includes(soil)) {
                scores[crop] += 2; // Perfect match
            }
        }

        let bestCrop = 'tomato'; // Default fallback
        let maxScore = -1;
        for (const crop in scores) {
            if (scores[crop] > maxScore) {
                maxScore = scores[crop];
                bestCrop = crop;
            }
        }
        
        const data = recommendationData[bestCrop];
        const cropName = bestCrop.charAt(0).toUpperCase() + bestCrop.slice(1);
        const sliderImages = data.images.map((img, index) => `<div class="rec-slider-item absolute w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}"><img src="${img}" class="w-full h-full object-cover"></div>`).join('');

        recommendationResult.innerHTML = `
            <p class="font-semibold text-green-600">Our AI Recommends:</p>
            <h3 class="text-6xl font-extrabold my-4 text-gray-800">${cropName}</h3>
            <div class="relative h-80 rounded-xl overflow-hidden shadow-2xl my-6">
                ${sliderImages}
                <button id="rec-prev" class="absolute top-1/2 left-3 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full z-10 transition"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
                <button id="rec-next" class="absolute top-1/2 right-3 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full z-10 transition"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
            </div>
            <p class="text-gray-600 mt-4 max-w-lg mx-auto">${data.desc}</p>
            <button id="learn-more-btn" data-crop="${bestCrop}" class="mt-6 btn-primary">Learn More About ${cropName}</button>
        `;
        recommendationResult.classList.remove('hidden');

        let currentRecSlide = 0;
        const recSlides = recommendationResult.querySelectorAll('.rec-slider-item');
        const showRecSlide = (index) => { recSlides.forEach((s, i) => { s.classList.toggle('opacity-100', i === index); s.classList.toggle('opacity-0', i !== index); }); };
        recommendationResult.querySelector('#rec-next').addEventListener('click', () => { currentRecSlide = (currentRecSlide + 1) % recSlides.length; showRecSlide(currentRecSlide); });
        recommendationResult.querySelector('#rec-prev').addEventListener('click', () => { currentRecSlide = (currentRecSlide - 1 + recSlides.length) % recSlides.length; showRecSlide(currentRecSlide); });
        recommendationResult.querySelector('#learn-more-btn').addEventListener('click', (e) => {
            const cropKey = e.target.dataset.crop;
            showPage('crop-study');
            setTimeout(() => { document.getElementById('crop-selector').value = cropKey; displayCropInfo(cropKey); }, 100);
        });
    });

    // --- Initial Load ---
    updateNavbar();
    // This function will also correctly run createAutomationCharts if the default page was 'automation' (it's 'home')
    showPage('home'); 
    displayCropInfo('tomato');
    createGardenCropInput(); // Initial crop for garden planner
});