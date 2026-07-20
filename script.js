document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }

            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Mod List Population
    const rawModData = [
        "Additional Structures|v.4.2.2",
        "Advanced Netherite|fabric-2.1.3-mc1.20.1",
        "AdvancementInfo|1.20-fabric0.83.0-1.4",
        "Advancement Plaques|1.6.7",
        "AdventureZ|1.4.20+1.20.1",
        "Alloy Forgery|2.1.2+1.20",
        "Almanac|1.0.2",
        "Ambient Environment|11.0.0.1",
        "AmbientSounds|6.3.8",
        "Animal Feeding Trough|1.1.0+1.20.1",
        "Antique Atlas 4|3.1.2+1.20",
        "AppleSkin|2.5.2+mc1.20.1",
        "Architectury API|9.2.14+fabric",
        "Artifacts|9.5.17",
        "AutoTag|2.0.2+1.20",
        "BadOptimizations|2.4.1",
        "Balm|7.3.38+fabric-1.20.1",
        "BCLib|3.0.14",
        "Better Advancements|0.4.2.60",
        "Better Archeology|1.2.1-1.20.1",
        "BetterEnd|4.0.11",
        "BetterF3|7.0.2",
        "Better Mount HUD|1.2.2",
        "BetterNether|9.0.10",
        "Better Statistics Screen|3.12.6+fabric-1.20.1",
        "Blur+|3.1.0",
        "Bookshelf|20.2.15",
        "Bosses of Mass Destruction|1.7.5-1.20.1",
        "Bountiful|6.0.4+1.20.1",
        "BSL Shaders|10.1.3",
        "Cardinal Components API|5.2.3",
        "Cherished Worlds|6.1.7+1.20.1",
        "Cloth Config API|11.1.136+fabric",
        "Collective|1.20.1-8.32-fabric+forge+neo",
        "Combat Nouveau|v8.0.5-1.20.1-Fabric",
        "Combat Roll|1.3.3+1.20.1-fabric",
        "Comforts|6.4.0+1.20.1",
        "Complementary Shaders|r5.8.1",
        "Continuity|3.0.0+1.20.1",
        "Controlling|12.0.2",
        "CreativeCore|2.12.39",
        "Creeper Overhaul|3.0.2",
        "Cull Less Leaves|1.4.2+1.21-fabric",
        "Dark Loading Screen|1.6.14",
        "Debugify|1.20.1+2.0",
        "Deeper and Darker|1.3.3-plus-b-fabric+1.20",
        "Default Options|18.0.5+fabric-1.20.1",
        "Distant Horizons|3.1.2-b-1.20.1",
        "Dynamic Crosshair|9.10+1.20.1",
        "Dynamic FPS|3.11.4",
        "Easy Anvils|v8.0.2-1.20.1-Fabric",
        "Eating Animation|1.9.61",
        "[EMF] Entity Model Features|3.2.4-fabric",
        "End Remastered|5.2.4",
        "Enhanced Block Entities|0.9+1.20",
        "Entity Culling|1.10.5",
        "Equipment Compare|1.3.8",
        "[ETF] Entity Texture Features|7.1-fabric",
        "Fabric API|0.92.9+1.20.1",
        "Farmer's Delight Refabricated|1.20.1-2.4.1",
        "FerriteCore|6.0.1",
        "Geckolib|4.8.4",
        "Global Packs|19.3.7",
        "Horse Buff|2.1.3",
        "Hysteria Shaders|1.2.1",
        "Iceberg|1.1.25",
        "ImmediatelyFast|1.5.4+1.20.4",
        "Immersive Armors|1.7.2+1.20.1",
        "Immersive Weathering|1.20.1-2.0.5",
        "Indium|1.0.36+mc1.20.1",
        "InventoryHUD+|3.4.26",
        "Iris Shaders|1.7.6+1.20.1",
        "Just Enough Items (JEI)|15.20.0.132",
        "LambDynamicLights|4.4.0+1.20.1",
        "Lanterns Belong on Walls|1.6.1+1.20.1",
        "Legendary Tooltips|1.4.5",
        "Let Me Despawn|1.5.0",
        "LevelZ|1.4.13+1.20.1",
        "Lithium|mc1.20.1-0.11.4",
        "Make Bubbles Pop|0.3.0-fabric",
        "Memory Leak Fix|v1.1.5",
        "Mine Cells|2.0.0",
        "Mod Menu|7.2.2",
        "More Culling|1.20.1-0.24.5",
        "Mouse Tweaks|1.20-2.26-fabric",
        "Mythic Mounts|1.20.1-7.2",
        "Naturalist|5.0pre3-fabric",
        "Not Enough Animations|1.12.4",
        "Presence Footsteps|1.10.1+1.20.1",
        "Repurposed Structures|7.1.24+1.20.1",
        "Searchables|1.0.3",
        "Smooth Swapping|0.9.3.2-1.20.1",
        "Snow! Real Magic!|10.7.0",
        "Sodium|mc1.20.1-0.5.13",
        "Tectonic|3.0.17",
        "TerraBlender|3.0.1.10",
        "Terralith|2.5.4",
        "Time & Wind|1.4.8",
        "Tool Stats|16.0.10",
        "Trinkets|3.7.2",
        "Villager Names|1.20.1-8.5",
        "VillagersPlus|3.1",
        "Visuality|0.7.1",
        "Visual Workbench|v8.0.1",
        "When Dungeons Arise|2.1.57",
        "Winterly|0.9.3+1.20",
        "Wraith Waystones|3.3.3",
        "YUNG's Better Dungeons|1.20-Fabric-4.0.4",
        "YUNG's Better Strongholds|1.20-Fabric-4.0.3",
        "Zoomify|2.15.2+1.20.1"
    ];

    const modContainer = document.getElementById('mod-container');

    if (modContainer) {
        // Function to build elements out of the array
        const generateModCards = (items) => {
            items.forEach(modString => {
                const [name, version, imgUrl] = modString.split('|');
                const logoContent = imgUrl ? `<img src="${imgUrl}" alt="${name} Logo">` : `<i class="fa-solid fa-box-open"></i>`;

                const cardHtml = `
                    <div class="mod-card">
                        <div class="mod-logo">
                            ${logoContent}
                        </div>
                        <div class="mod-name">${name}</div>
                        <div class="mod-version">${version}</div>
                    </div>
                `;
                modContainer.innerHTML += cardHtml;
            });
        };

        // Render the array once
        generateModCards(rawModData);
        // Duplicate the exact same array immediately after to create a seamless looping canvas for the CSS animation
        generateModCards(rawModData);
    }
});