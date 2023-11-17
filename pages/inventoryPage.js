exports.InventoryPage = class InventoryPage {

    constructor(page) {
        this.page = page;
        this.elements = {
            hamburgerMenu: page.locator('#react-burger-menu-btn')
        };
    }
};

