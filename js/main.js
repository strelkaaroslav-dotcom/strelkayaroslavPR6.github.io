var app = new Vue({
  el: "article",
  data: {
    products: [
      {
        id: 1,
        title: "Nantes Carrot",
        short_text: "Sweet, tender and cylindrical variety with minimal core.",
        image: "m1.jpg",
        desc: "Nantes is one of the most popular carrot varieties worldwide. It produces uniform, cylindrical roots with a blunt tip and minimal core. The flesh is sweet, tender, and nearly coreless, making it excellent for fresh eating, juicing, and cooking. Nantes carrots are medium-sized (15–20 cm), with a bright orange color and smooth skin. They grow well in a wide range of soils but prefer deep, well-drained, sandy loam."
      },
      {
        id: 2,
        title: "Chantenay Carrot",
        short_text: "Stocky, broad-shouldered carrot ideal for heavy soils.",
        image: "m2.jpg",
        desc: "Chantenay is a robust, stocky carrot variety with broad shoulders that taper to a point. It is well-adapted to heavy clay soils where longer varieties struggle. The roots are shorter (10–15 cm) but wide, producing a high yield even in less-than-ideal conditions. Chantenay carrots have a rich, sweet flavor and a crisp texture. They are commonly used for fresh markets, processing, and storage due to their excellent shelf life."
      },
      {
        id: 3,
        title: "Danvers Carrot",
        short_text: "Adaptable, flavorful variety with strong disease resistance.",
        image: "m3.jpg",
        desc: "Danvers is a classic carrot variety originating from Danvers, Massachusetts. It produces medium-length, tapered roots (15–20 cm) with a distinctive broad shoulder and well-developed flavor. The variety is highly adaptable, thriving in both heavy and light soils. Danvers carrots are known for their strong disease resistance and consistent performance across various growing conditions. They are excellent for fresh markets, processing, and home gardens."
      },
      {
        id: 4,
        title: "Imperator Carrot",
        short_text: "Long, tapered variety preferred by commercial growers.",
        image: "m4.jpg",
        desc: "Imperator is the most widely grown commercial carrot variety in North America. It produces long, tapered roots (20–28 cm) with a smooth skin and bright orange color. The flavor is mild and sweet, making it ideal for the fresh market. Imperator carrots require deep, loose, sandy soil to develop their characteristic length. They are harvested and sold as whole carrots or baby-cut carrots, making them extremely versatile for both retail and food service markets."
      },
      {
        id: 5,
        title: "Paris Market Carrot",
        short_text: "Round, globe-shaped variety perfect for containers and poor soils.",
        image: "m5.jpg",
        desc: "Paris Market (also known as Paris Round or Tonda di Parigi) is a unique ball-shaped carrot variety. Unlike typical elongated carrots, Paris Market produces small, round roots (3–5 cm diameter) that are extremely sweet and tender. This variety is ideal for growing in containers, raised beds, or shallow, rocky soils where longer varieties cannot develop properly. The small size makes them popular for gourmet cooking and as a novelty crop at farmers' markets."
      }
    ],
    product: {},
    btnVisible: 0,

    cart: [],

    contactFields: {
      name:     '',
      company:  '',
      position: '',
      city:     '',
      country:  '',
      tel:      '',
      email:    '',
      role:     '',
      other:    '',
      interest: '',
      captcha:  ''
    },

    orderSubmitted: false,
    captchaError: false
  },

  mounted: function () {
    this.getProduct();
    this.checkInCart();
    this.getCart();
  },

  methods: {

    getProduct: function () {
      if (window.location.hash) {
        var id = window.location.hash.replace('#', '');
        if (this.products && this.products.length > 0) {
          for (var i in this.products) {
            if (this.products[i] && this.products[i].id && id == this.products[i].id)
              this.product = this.products[i];
          }
        }
      }
    },

    addToCart: function (id) {
      var cart = [];
      if (window.localStorage.getItem('cart')) {
        cart = window.localStorage.getItem('cart').split(',');
      }
      if (cart.indexOf(String(id)) === -1) {
        cart.push(id);
        window.localStorage.setItem('cart', cart.join());
        this.btnVisible = 1;
      }
    },

    checkInCart: function () {
      if (this.product && this.product.id && window.localStorage.getItem('cart') &&
          window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !== -1)
        this.btnVisible = 1;
    },

    getCart: function () {
      this.cart = [];
      var stored = window.localStorage.getItem('cart');
      if (stored) {
        var ids = stored.split(',');
        for (var i = 0; i < this.products.length; i++) {
          if (ids.indexOf(String(this.products[i].id)) !== -1) {
            this.cart.push(this.products[i]);
          }
        }
      }
    },

    removeFromCart: function (id) {
      this.cart = this.cart.filter(function (item) {
        return item.id !== id;
      });

      var stored = window.localStorage.getItem('cart');
      if (stored) {
        var ids = stored.split(',').filter(function (i) {
          return i !== String(id);
        });
        if (ids.length > 0) {
          window.localStorage.setItem('cart', ids.join(','));
        } else {
          window.localStorage.removeItem('cart');
        }
      }
    },

    makeOrder: function () {
      if (this.contactFields.captcha !== '7CJ3') {
        this.captchaError = true;
        return;
      }
      this.captchaError = false;

      this.orderSubmitted = true;

      this.cart = [];
      window.localStorage.removeItem('cart');
    }
  }
});
