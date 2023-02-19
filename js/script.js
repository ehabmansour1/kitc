!(function () {
  let t = navigator.userAgent.toLowerCase(),
    a =
      -1 !== t.indexOf("msie")
        ? parseInt(t.split("msie")[1], 10)
        : -1 !== t.indexOf("trident")
        ? 11
        : -1 !== t.indexOf("edge") && 12;
  if (!1 !== a && a < 12) {
    console.warn("[Core] detected IE" + a + ", load alert");
    var e = document.createElement("script");
    (e.src = "./js/support.js"), document.querySelector("head").appendChild(e);
  }
  let r = new Date(),
    i = $(document),
    o = $(window),
    n = $("html"),
    l = $("body"),
    s = n.hasClass("desktop"),
    d = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    c = !1,
    u = !1,
    p,
    g = {
      bootstrapTooltip: $("[data-bs-toggle='tooltip']"),
      bootstrapModalDialog: $(".modal"),
      bootstrapTabs: $(".tabs-custom"),
      rdNavbar: $(".rd-navbar"),
      mfp: $("[data-lightbox]").not(
        '[data-lightbox="gallery"] [data-lightbox]'
      ),
      mfpGallery: $('[data-lightbox^="gallery"]'),
      materialParallax: $(".parallax-container"),
      rdMailForm: $(".rd-mailform"),
      rdInputLabel: $(".form-label"),
      regula: $("[data-constraints]"),
      selectFilter: $("select"),
      stepper: $("input[type='number']"),
      wow: $(".wow"),
      owl: $(".owl-carousel"),
      swiper: $(".swiper-slider"),
      search: $(".rd-search"),
      searchResults: $(".rd-search-results"),
      statefulButton: $(".btn-stateful"),
      isotope: $(".isotope-wrap"),
      popover: $('[data-bs-toggle="popover"]'),
      viewAnimate: $(".view-animate"),
      radio: $("input[type='radio']"),
      checkbox: $("input[type='checkbox']"),
      customToggle: $("[data-custom-toggle]"),
      preloader: $(".preloader"),
      captcha: $(".recaptcha"),
      scroller: $(".scroll-wrap"),
      lightGallery: $("[data-lightgallery='group']"),
      lightGalleryItem: $("[data-lightgallery='item']"),
      lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
      mailchimp: $(".mailchimp-mailform"),
      campaignMonitor: $(".campaign-mailform"),
      copyrightYear: $(".copyright-year"),
      layoutToggle: $(".layout-toggle"),
      multitoggle: document.querySelectorAll("[data-multitoggle]"),
      hoverEls: document.querySelectorAll("[data-hover-group]"),
      switcher: $(".switcher-inline"),
      counter: document.querySelectorAll(".counter"),
      progressLinear: document.querySelectorAll(".progress-linear"),
      progressCircle: document.querySelectorAll(".progress-circle"),
      countdown: document.querySelectorAll(".countdown"),
    };
  function h(t) {
    return (
      !!u ||
      (t.offset().top + t.outerHeight() >= o.scrollTop() &&
        t.offset().top <= o.scrollTop() + o.height())
    );
  }
  function m(t, a) {
    let e = function () {
      !t.hasClass("lazy-loaded") &&
        h(t) &&
        (a.call(t), t.addClass("lazy-loaded"));
    };
    e(), o.on("scroll", e);
  }
  o.on("load", function () {
    if (
      (g.preloader.length &&
        !u &&
        pageTransition({
          target: document.querySelector(".page"),
          delay: 100,
          duration: 500,
          classIn: "fadeIn",
          classOut: "fadeOut",
          classActive: "animated",
          conditions: function (t, a) {
            return (
              !/(\#|callto:|tel:|mailto:|:\/\/)/.test(a) &&
              !t.currentTarget.hasAttribute("data-lightgallery")
            );
          },
          onTransitionStart: function (t) {
            setTimeout(function () {
              g.preloader.removeClass("loaded");
            }, 0.75 * t.duration);
          },
          onReady: function () {
            g.preloader.addClass("loaded"), (c = !0);
          },
        }),
      g.counter)
    )
      for (let t = 0; t < g.counter.length; t++) {
        let e = g.counter[t],
          r =
            (aCounter({
              node: e,
              duration: e.getAttribute("data-duration") || 1e3,
            }),
            function () {
              Util.inViewport(this) &&
                !this.classList.contains("animated-first") &&
                (this.counter.run(), this.classList.add("animated-first"));
            }.bind(e)),
          i = function () {
            (this.counter.params.to = parseInt(this.textContent, 10)),
              this.counter.run();
          }.bind(e);
        u
          ? (e.counter.run(), e.addEventListener("blur", i))
          : (r(), window.addEventListener("scroll", r));
      }
    if (g.progressLinear)
      for (var o = 0; o < g.progressLinear.length; o++) {
        var n = g.progressLinear[o],
          l = aCounter({
            node: n.querySelector(".progress-linear-counter"),
            duration: n.getAttribute("data-duration") || 1e3,
            onStart: function () {
              this.custom.bar.style.width = this.params.to + "%";
            },
          });
        (l.custom = {
          container: n,
          bar: n.querySelector(".progress-linear-bar"),
          onScroll: function () {
            ((Util.inViewport(this.custom.container) &&
              !this.custom.container.classList.contains("animated")) ||
              u) &&
              (this.run(), this.custom.container.classList.add("animated"));
          }.bind(l),
          onBlur: function () {
            (this.params.to = parseInt(this.params.node.textContent, 10)),
              this.run();
          }.bind(l),
        }),
          u
            ? (l.run(), l.params.node.addEventListener("blur", l.custom.onBlur))
            : (l.custom.onScroll(),
              document.addEventListener("scroll", l.custom.onScroll));
      }
    if (g.progressCircle)
      for (var o = 0; o < g.progressCircle.length; o++) {
        var n = g.progressCircle[o],
          l = aCounter({
            node: n.querySelector(".progress-circle-counter"),
            duration: 500,
            onUpdate: function (t) {
              this.custom.bar.render(3.6 * t);
            },
          });
        (l.params.onComplete = l.params.onUpdate),
          (l.custom = {
            container: n,
            bar: aProgressCircle({
              node: n.querySelector(".progress-circle-bar"),
            }),
            onScroll: function () {
              Util.inViewport(this.custom.container) &&
                !this.custom.container.classList.contains("animated") &&
                (this.run(), this.custom.container.classList.add("animated"));
            }.bind(l),
            onBlur: function () {
              (this.params.to = parseInt(this.params.node.textContent, 10)),
                this.run();
            }.bind(l),
          }),
          u
            ? (l.run(), l.params.node.addEventListener("blur", l.custom.onBlur))
            : (l.custom.onScroll(),
              window.addEventListener("scroll", l.custom.onScroll));
      }
    if (g.isotope.length)
      for (var o = 0; o < g.isotope.length; o++) {
        var s = g.isotope[o],
          p = function (t) {
            t.preventDefault();
            for (var a = 0; a < this.isoGroup.filters.length; a++)
              this.isoGroup.filters[a].classList.remove("active");
            this.classList.add("active"),
              this.isoGroup.isotope.arrange({
                filter:
                  "*" !== this.getAttribute("data-isotope-filter")
                    ? '[data-filter*="' +
                      this.getAttribute("data-isotope-filter") +
                      '"]'
                    : "*",
              });
          },
          h = function () {
            this.isoGroup.isotope.layout();
          };
        (s.isoGroup = {}),
          (s.isoGroup.filters = s.querySelectorAll("[data-isotope-filter]")),
          (s.isoGroup.node = s.querySelector(".isotope")),
          (s.isoGroup.layout = s.isoGroup.node.getAttribute(
            "data-isotope-layout"
          )
            ? s.isoGroup.node.getAttribute("data-isotope-layout")
            : "masonry"),
          (s.isoGroup.isotope = new Isotope(s.isoGroup.node, {
            itemSelector: ".isotope-item",
            layoutMode: s.isoGroup.layout,
            filter: "*",
          }));
        for (var m = 0; m < s.isoGroup.filters.length; m++) {
          var f = s.isoGroup.filters[m];
          (f.isoGroup = s.isoGroup), f.addEventListener("click", p);
        }
        window.addEventListener("resize", h.bind(s));
      }
    if (g.materialParallax.length) {
      if (u || a || d)
        for (var o = 0; o < g.materialParallax.length; o++) {
          var v = $(g.materialParallax[o]);
          v.addClass("parallax-disabled"),
            v.css({
              "background-image": "url(" + v.data("parallax-img") + ")",
            });
        }
      else g.materialParallax.parallax();
    }
  }),
    $(function () {
      function t(t) {
        for (
          var a = t.el.querySelectorAll("[data-slide-bg]"), e = 0;
          e < a.length;
          e++
        )
          a[e].style.backgroundImage =
            "url(" + a[e].getAttribute("data-slide-bg") + ")";
      }
      function e(t) {
        var a = function (t) {
            return function () {
              var a;
              (a = t.getAttribute("data-caption-duration")) &&
                (t.style.animationDuration = a + "ms"),
                t.classList.remove("not-animated"),
                t.classList.add(t.getAttribute("data-caption-animate")),
                t.classList.add("animated");
            };
          },
          e = function (t) {
            for (var a = 0; a < t.length; a++) {
              var e = t[a];
              e.classList.remove("animated"),
                e.classList.remove(e.getAttribute("data-caption-animate")),
                e.classList.add("not-animated");
            }
          },
          r = function (t) {
            for (var e = 0; e < t.length; e++) {
              var r = t[e];
              r.getAttribute("data-caption-delay")
                ? setTimeout(a(r), Number(r.getAttribute("data-caption-delay")))
                : a(r)();
            }
          };
        (t.params.caption = { animationEvent: "slideChangeTransitionEnd" }),
          e(t.$wrapperEl[0].querySelectorAll("[data-caption-animate]")),
          r(
            t.$wrapperEl[0].children[t.activeIndex].querySelectorAll(
              "[data-caption-animate]"
            )
          ),
          "slideChangeTransitionEnd" === t.params.caption.animationEvent
            ? t.on(t.params.caption.animationEvent, function () {
                e(
                  t.$wrapperEl[0].children[t.previousIndex].querySelectorAll(
                    "[data-caption-animate]"
                  )
                ),
                  r(
                    t.$wrapperEl[0].children[t.activeIndex].querySelectorAll(
                      "[data-caption-animate]"
                    )
                  );
              })
            : (t.on("slideChangeTransitionEnd", function () {
                e(
                  t.$wrapperEl[0].children[t.previousIndex].querySelectorAll(
                    "[data-caption-animate]"
                  )
                );
              }),
              t.on(t.params.caption.animationEvent, function () {
                r(
                  t.$wrapperEl[0].children[t.activeIndex].querySelectorAll(
                    "[data-caption-animate]"
                  )
                );
              }));
      }
      function d() {
        this.el.querySelector(".swiper-counter").innerHTML =
          '<span class="count">' +
          m(this.realIndex + 1) +
          '</span>/<span class="total">' +
          m(this.el.slidesQuantity) +
          "</span>";
      }
      function m(t) {
        return t < 10 ? "0" + t : t;
      }
      function f(t) {
        for (
          var a = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
            e = [0, 576, 768, 992, 1200, 1600],
            r = {},
            i = 0;
          i < e.length;
          i++
        ) {
          r[e[i]] = {};
          for (var o = i; o >= -1; o--)
            !r[e[i]].items &&
              t.attr("data" + a[o] + "items") &&
              (r[e[i]].items =
                o < 0 ? 1 : parseInt(t.attr("data" + a[o] + "items"), 10)),
              !r[e[i]].stagePadding &&
                0 !== r[e[i]].stagePadding &&
                t.attr("data" + a[o] + "stage-padding") &&
                (r[e[i]].stagePadding =
                  o < 0
                    ? 0
                    : parseInt(t.attr("data" + a[o] + "stage-padding"), 10)),
              !r[e[i]].margin &&
                0 !== r[e[i]].margin &&
                t.attr("data" + a[o] + "margin") &&
                (r[e[i]].margin =
                  o < 0 ? 30 : parseInt(t.attr("data" + a[o] + "margin"), 10));
        }
        t.attr("data-dots-custom") &&
          t.on("initialized.owl.carousel", function (t) {
            var a = $(t.currentTarget),
              e = $(a.attr("data-dots-custom")),
              r = 0;
            a.attr("data-active") && (r = parseInt(a.attr("data-active"), 10)),
              a.trigger("to.owl.carousel", [r, 300, !0]),
              e.find("[data-owl-item='" + r + "']").addClass("active"),
              e.find("[data-owl-item]").on("click", function (t) {
                t.preventDefault(),
                  a.trigger("to.owl.carousel", [
                    parseInt(this.getAttribute("data-owl-item"), 10),
                    300,
                    !0,
                  ]);
              }),
              a.on("translate.owl.carousel", function (t) {
                e.find(".active").removeClass("active"),
                  e
                    .find("[data-owl-item='" + t.item.index + "']")
                    .addClass("active");
              });
          }),
          t.on("initialized.owl.carousel", function () {
            x(t.find('[data-lightgallery="item"]'), "lightGallery-in-carousel");
          }),
          t.owlCarousel({
            autoplay: !u && "true" === t.attr("data-autoplay"),
            loop: !u && "false" !== t.attr("data-loop"),
            items: 1,
            center: "true" === t.attr("data-center"),
            dotsContainer: t.attr("data-pagination-class") || !1,
            navContainer: t.attr("data-navigation-class") || !1,
            mouseDrag: !u && "false" !== t.attr("data-mouse-drag"),
            nav: "true" === t.attr("data-nav"),
            dots: "true" === t.attr("data-dots"),
            dotsEach:
              !!t.attr("data-dots-each") &&
              parseInt(t.attr("data-dots-each"), 10),
            animateIn:
              !!t.attr("data-animation-in") && t.attr("data-animation-in"),
            animateOut:
              !!t.attr("data-animation-out") && t.attr("data-animation-out"),
            responsive: r,
            navText: (function () {
              try {
                return JSON.parse(t.attr("data-nav-text"));
              } catch (a) {
                return [];
              }
            })(),
            navClass: (function () {
              try {
                return JSON.parse(t.attr("data-nav-class"));
              } catch (a) {
                return ["owl-prev", "owl-next"];
              }
            })(),
          });
      }
      function v(t) {
        $("#" + t.live)
          .removeClass("cleared")
          .html(),
          t.current++,
          t.spin.addClass("loading"),
          $.get(
            L,
            {
              s: decodeURI(t.term),
              liveSearch: t.live,
              dataType: "html",
              liveCount: t.liveCount,
              filter: t.filter,
              template: t.template,
            },
            function (a) {
              t.processed++;
              var e = $("#" + t.live);
              t.processed !== t.current ||
                e.hasClass("cleared") ||
                (e.find("> #search-results").removeClass("active"),
                e.html(a),
                setTimeout(function () {
                  e.find("> #search-results").addClass("active");
                }, 50)),
                t.spin
                  .parents(".rd-search")
                  .find(".input-group-addon")
                  .removeClass("loading");
            }
          );
      }
      function b(t, a) {
        var e,
          r = 0;
        if (t.length) {
          for (var i = 0; i < t.length; i++) {
            var o = $(t[i]);
            if ((e = o.regula("validate")).length)
              for (J = 0; J < e.length; J++)
                r++,
                  o
                    .siblings(".form-validation")
                    .text(e[J].message)
                    .parent()
                    .addClass("has-error");
            else
              o.siblings(".form-validation")
                .text("")
                .parent()
                .removeClass("has-error");
          }
          return a && a.length
            ? (function t(a) {
                return (
                  0 !== a.find(".g-recaptcha-response").val().length ||
                  (a
                    .siblings(".form-validation")
                    .html("Please, prove that you are not robot.")
                    .addClass("active"),
                  a.closest(".form-wrap").addClass("has-error"),
                  a.on("propertychange", function () {
                    var t = $(this);
                    t.find(".g-recaptcha-response").val().length > 0 &&
                      (t.closest(".form-wrap").removeClass("has-error"),
                      t
                        .siblings(".form-validation")
                        .removeClass("active")
                        .html(""),
                      t.off("propertychange"));
                  }),
                  !1)
                );
              })(a) && 0 === r
            : 0 === r;
        }
        return !0;
      }
      u = window.xMode;
      function y(t) {
        g.bootstrapTooltip.tooltip("dispose"),
          window.innerWidth < 576
            ? g.bootstrapTooltip.tooltip({ placement: "bottom" })
            : g.bootstrapTooltip.tooltip({ placement: t });
      }
      function w(t, a) {
        u ||
          $(t).lightGallery({
            thumbnail: "false" !== $(t).attr("data-lg-thumbnail"),
            selector: "[data-lightgallery='item']",
            autoplay: "true" === $(t).attr("data-lg-autoplay"),
            pause: parseInt($(t).attr("data-lg-autoplay-delay")) || 5e3,
            addClass: a,
            mode: $(t).attr("data-lg-animation") || "lg-slide",
            loop: "false" !== $(t).attr("data-lg-loop"),
          });
      }
      function C(t, a) {
        u ||
          $(t).on("click", function () {
            $(t).lightGallery({
              thumbnail: "false" !== $(t).attr("data-lg-thumbnail"),
              selector: "[data-lightgallery='item']",
              autoplay: "true" === $(t).attr("data-lg-autoplay"),
              pause: parseInt($(t).attr("data-lg-autoplay-delay")) || 5e3,
              addClass: a,
              mode: $(t).attr("data-lg-animation") || "lg-slide",
              loop: "false" !== $(t).attr("data-lg-loop"),
              dynamic: !0,
              dynamicEl:
                JSON.parse($(t).attr("data-lg-dynamic-elements")) || [],
            });
          });
      }
      function x(t, a) {
        u ||
          $(t).lightGallery({
            selector: "this",
            addClass: a,
            counter: !1,
            youtubePlayerParams: {
              modestbranding: 1,
              showinfo: 0,
              rel: 0,
              controls: 0,
            },
            vimeoPlayerParams: { byline: 0, portrait: 0 },
          });
      }
      if (
        ((window.onloadCaptchaCallback = function () {
          for (var t = 0; t < g.captcha.length; t++) {
            var a = $(g.captcha[t]);
            grecaptcha.render(a.attr("id"), {
              sitekey: a.attr("data-sitekey"),
              size: a.attr("data-size") ? a.attr("data-size") : "normal",
              theme: a.attr("data-theme") ? a.attr("data-theme") : "light",
              callback: function (t) {
                $(".recaptcha").trigger("propertychange");
              },
            }),
              a.after("<span class='form-validation'></span>");
          }
        }),
        g.captcha.length &&
          $.getScript(
            "//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en"
          ),
        navigator.platform.match(/(Mac)/i) && n.addClass("mac-os"),
        a &&
          (a < 10 && n.addClass("lt-ie-10"),
          a < 11 &&
            $.getScript("js/pointer-events.min.js").done(function () {
              n.addClass("ie-10"), PointerEventsPolyfill.initialize({});
            }),
          11 === a && n.addClass("ie-11"),
          12 === a && n.addClass("ie-edge")),
        g.bootstrapTooltip.length)
      ) {
        var _,
          A = g.bootstrapTooltip.attr("data-bs-placement");
        y(A),
          o.on("resize orientationchange", function () {
            y(A);
          });
      }
      if (g.bootstrapModalDialog.length)
        for (var _ = 0; _ < g.bootstrapModalDialog.length; _++) {
          var S = $(g.bootstrapModalDialog[_]);
          S.on(
            "hidden.bs.modal",
            $.proxy(function () {
              var t = $(this),
                a = t.find("video"),
                e = t.find("iframe");
              if ((a.length && a[0].pause(), e.length)) {
                var r = e.attr("src");
                e.attr("src", "").attr("src", r);
              }
            }, S)
          );
        }
      if (
        (g.popover.length &&
          (window.innerWidth < 767 &&
            g.popover.attr("data-bs-placement", "bottom"),
          g.popover.popover()),
        g.statefulButton.length &&
          $(g.statefulButton).on("click", function () {
            var t = $(this).button("loading");
            setTimeout(function () {
              t.button("reset");
            }, 2e3);
          }),
        g.bootstrapTabs.length)
      )
        for (var _ = 0; _ < g.bootstrapTabs.length; _++) {
          var k = $(g.bootstrapTabs[_]);
          k.find(".slick-slider").length &&
            k.find(".tabs-custom-list > li > a").on(
              "click",
              $.proxy(function () {
                var t = $(this);
                setTimeout(
                  function () {
                    t.find(".tab-content .tab-pane.active .slick-slider").slick(
                      "setPosition"
                    );
                  },
                  u ? 1500 : 300
                );
              }, k)
            );
        }
      if (
        (g.copyrightYear.length && g.copyrightYear.text(r.getFullYear()),
        g.preloader.length &&
          (p = setTimeout(function () {
            c || u || g.preloader.removeClass("loaded");
          }, 2e3)),
        g.radio.length)
      )
        for (var _ = 0; _ < g.radio.length; _++)
          $(g.radio[_])
            .addClass("radio-custom")
            .after("<span class='radio-custom-dummy'></span>");
      if (g.checkbox.length)
        for (var _ = 0; _ < g.checkbox.length; _++)
          $(g.checkbox[_])
            .addClass("checkbox-custom")
            .after("<span class='checkbox-custom-dummy'></span>");
      if (
        (s &&
          !u &&
          $().UItoTop({
            text: "Back To Top",
            easingType: "easeOutQuad",
            containerClass: "ui-to-top",
          }),
        g.owl.length)
      )
        for (var _ = 0; _ < g.owl.length; _++) {
          var T = $(g.owl[_]);
          (g.owl[_].owl = T), f(T);
        }
      if (g.rdNavbar.length) {
        for (
          U = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
            Q = [0, 576, 768, 992, 1200, 1600],
            W = {},
            _ = V = 0,
            H = Q.length;
          V < H;
          _ = ++V
        )
          (Y = Q[_]),
            W[Q[_]] || (W[Q[_]] = {}),
            g.rdNavbar.attr("data" + U[_] + "layout") &&
              (W[Q[_]].layout = g.rdNavbar.attr("data" + U[_] + "layout")),
            g.rdNavbar.attr("data" + U[_] + "device-layout") &&
              (W[Q[_]].deviceLayout = g.rdNavbar.attr(
                "data" + U[_] + "device-layout"
              )),
            g.rdNavbar.attr("data" + U[_] + "hover-on") &&
              (W[Q[_]].focusOnHover =
                "true" === g.rdNavbar.attr("data" + U[_] + "hover-on")),
            g.rdNavbar.attr("data" + U[_] + "auto-height") &&
              (W[Q[_]].autoHeight =
                "true" === g.rdNavbar.attr("data" + U[_] + "auto-height")),
            u
              ? (W[Q[_]].stickUp = !1)
              : g.rdNavbar.attr("data" + U[_] + "stick-up") &&
                (W[Q[_]].stickUp =
                  "true" === g.rdNavbar.attr("data" + U[_] + "stick-up")),
            g.rdNavbar.attr("data" + U[_] + "stick-up-offset") &&
              (W[Q[_]].stickUpOffset = g.rdNavbar.attr(
                "data" + U[_] + "stick-up-offset"
              ));
        g.rdNavbar.RDNavbar({
          anchorNav: !u,
          stickUpClone:
            !!g.rdNavbar.attr("data-stick-up-clone") &&
            !u &&
            "true" === g.rdNavbar.attr("data-stick-up-clone"),
          responsive: W,
          callbacks: {
            onStuck: function () {
              var t = this.$element.find(".rd-search input");
              t && t.val("").trigger("propertychange");
            },
            onDropdownOver: function () {
              return !u;
            },
            onUnstuck: function () {
              if (null !== this.$clone) {
                var t = this.$clone.find(".rd-search input");
                t && (t.val("").trigger("propertychange"), t.trigger("blur"));
              }
            },
          },
        }),
          g.rdNavbar.attr("data-body-class") &&
            (document.body.className +=
              " " + g.rdNavbar.attr("data-body-class"));
      }
      if (g.search.length || g.searchResults) {
        var L = "bat/rd-search.php",
          G =
            '<h6 class="search-title"><a target="_top" href="#{href}" class="search-link">#{title}</a></h6><p>...#{token}...</p><p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
        if (g.search.length)
          for (var _ = 0; _ < g.search.length; _++) {
            var E = $(g.search[_]),
              M = {
                element: E,
                filter: E.attr("data-search-filter")
                  ? E.attr("data-search-filter")
                  : "*.html",
                template: E.attr("data-search-template")
                  ? E.attr("data-search-template")
                  : G,
                live:
                  !!E.attr("data-search-live") && E.attr("data-search-live"),
                liveCount: E.attr("data-search-live-count")
                  ? parseInt(E.attr("data-search-live"), 10)
                  : 4,
                current: 0,
                processed: 0,
                timer: {},
              },
              I = $(".rd-navbar-search-toggle");
            if (
              (I.length &&
                I.on(
                  "click",
                  (function (t) {
                    return function () {
                      $(this).hasClass("active") ||
                        t.find("input").val("").trigger("propertychange");
                    };
                  })(E)
                ),
              M.live)
            ) {
              var q = !1;
              E.find("input").on(
                "input propertychange",
                $.proxy(
                  function () {
                    (this.term = this.element.find("input").val().trim()),
                      (this.spin = this.element.find(".input-group-addon")),
                      clearTimeout(this.timer),
                      this.term.length > 2
                        ? ((this.timer = setTimeout(v(this), 200)),
                          !1 === q &&
                            ((q = !0),
                            l.on("click", function (t) {
                              0 ===
                                $(t.toElement).parents(".rd-search").length &&
                                $("#rd-search-results-live")
                                  .addClass("cleared")
                                  .html("");
                            })))
                        : 0 === this.term.length &&
                          $("#" + this.live)
                            .addClass("cleared")
                            .html("");
                  },
                  M,
                  this
                )
              );
            }
            E.submit(
              $.proxy(
                function () {
                  return (
                    $("<input />")
                      .attr("type", "hidden")
                      .attr("name", "filter")
                      .attr("value", this.filter)
                      .appendTo(this.element),
                    !0
                  );
                },
                M,
                this
              )
            );
          }
        if (g.searchResults.length) {
          var P = /\?.*s=([^&]+)\&filter=([^&]+)/g.exec(location.search);
          null !== P &&
            $.get(
              L,
              {
                s: decodeURI(P[1]),
                dataType: "html",
                filter: P[2],
                template: G,
                live: "",
              },
              function (t) {
                g.searchResults.html(t);
              }
            );
        }
      }
      if (g.viewAnimate.length)
        for (var _ = 0; _ < g.viewAnimate.length; _++) {
          var F = $(g.viewAnimate[_]).not(".active");
          i.on(
            "scroll",
            $.proxy(function () {
              h(this) && this.addClass("active");
            }, F)
          ).trigger("scroll");
        }
      if (g.swiper.length)
        for (var _ = 0; _ < g.swiper.length; _++) {
          let N = g.swiper[_],
            D = [],
            z = {
              loop: "true" === N.getAttribute("data-loop"),
              loopedSlides: N.hasAttribute("data-looped-slides")
                ? Number(N.hasAttribute("data-looped-slides"))
                : null,
              effect: a
                ? "slide"
                : N.getAttribute("data-slide-effect") || "slide",
              direction: N.getAttribute("data-direction") || "horizontal",
              speed: N.getAttribute("data-speed")
                ? Number(N.getAttribute("data-speed"))
                : 1e3,
              slidesPerView: N.getAttribute("data-slides-per-view")
                ? Number(N.getAttribute("data-slides-per-view"))
                : 1,
              spaceBetween: N.getAttribute("data-space-between")
                ? Number(N.getAttribute("data-space-between"))
                : 0,
            };
          if (
            (N.getAttribute("data-autoplay") &&
              (z.autoplay = {
                delay: Number(N.getAttribute("data-autoplay")) || 3e3,
                stopOnLastSlide: !1,
                disableOnInteraction: !0,
                reverseDirection: !1,
              }),
            "true" === N.getAttribute("data-keyboard") &&
              (z.keyboard = {
                enabled: "true" === N.getAttribute("data-keyboard"),
                onlyInViewport: !0,
              }),
            "true" === N.getAttribute("data-mousewheel") &&
              (z.mousewheel = { releaseOnEdges: !0, sensitivity: 0.1 }),
            N.hasAttribute("data-secondary") &&
              ((z.watchSlidesVisibility = !0), (z.watchSlidesProgress = !0)),
            N.querySelector(".swiper-button-next, .swiper-button-prev") &&
              (z.navigation = {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }),
            N.querySelector(".swiper-scrollbar") &&
              (z.scrollbar = {
                el: ".swiper-scrollbar",
                hide: !0,
                draggable: !0,
              }),
            N.querySelector(".swiper-pagination") &&
              (z.pagination = {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: !0,
              }),
            N.querySelector(".swiper-pagination-progressbar") &&
              (z.pagination = {
                el: ".swiper-pagination-progressbar",
                type: "progressbar",
              }),
            N.querySelector(".swiper-counter") &&
              ((N.slidesQuantity = N.querySelectorAll(".swiper-slide").length),
              D.push(d)),
            (z.on = {
              init: function () {
                this.el.dispatchEvent(new CustomEvent("swiper:init")),
                  t(this),
                  e(this),
                  D.forEach(
                    function (t) {
                      t.call(this);
                    }.bind(this)
                  );
              },
              slideChange: function () {
                D.forEach(
                  function (t) {
                    t.call(this);
                  }.bind(this)
                );
              },
            }),
            N.hasAttribute("data-thumb"))
          ) {
            let O = document.querySelector(N.getAttribute("data-thumb"));
            O.swiper
              ? ((z.thumbs = { swiper: O.swiper }), new Swiper(N, z))
              : O.addEventListener("swiper:init", function () {
                  (z.thumbs = { swiper: O.swiper }), new Swiper(N, z);
                });
          } else new Swiper(g.swiper[_], z);
        }
      if (
        (n.hasClass("wow-animation") &&
          g.wow.length &&
          !u &&
          s &&
          new WOW().init(),
        g.rdInputLabel.length && g.rdInputLabel.RDInputLabel(),
        g.regula.length &&
          (function t(a) {
            regula.custom({
              name: "PhoneNumber",
              defaultMessage: "Invalid phone number format",
              validator: function () {
                return (
                  "" === this.value ||
                  /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value)
                );
              },
            });
            for (var e = 0; e < a.length; e++) {
              var r,
                i = $(a[e]);
              i
                .addClass("form-control-has-validation")
                .after("<span class='form-validation'></span>"),
                (r = i.parent().find(".form-validation")).is(":last-child") &&
                  i.addClass("form-control-last-child");
            }
            a.on("input change propertychange blur", function (t) {
              var a,
                r = $(this);
              if (
                ("blur" === t.type || r.parent().hasClass("has-error")) &&
                !r.parents(".rd-mailform").hasClass("success")
              ) {
                if ((a = r.regula("validate")).length)
                  for (e = 0; e < a.length; e++)
                    r.siblings(".form-validation")
                      .text(a[e].message)
                      .parent()
                      .addClass("has-error");
                else
                  r.siblings(".form-validation")
                    .text("")
                    .parent()
                    .removeClass("has-error");
              }
            }).regula("bind");
            for (
              var o = [
                  {
                    type: regula.Constraint.Required,
                    newMessage: "The text field is required.",
                  },
                  {
                    type: regula.Constraint.Email,
                    newMessage: "The email is not a valid email.",
                  },
                  {
                    type: regula.Constraint.Numeric,
                    newMessage: "Only numbers are required",
                  },
                  {
                    type: regula.Constraint.Selected,
                    newMessage: "Please choose an option.",
                  },
                ],
                e = 0;
              e < o.length;
              e++
            ) {
              var n = o[e];
              regula.override({
                constraintType: n.type,
                defaultMessage: n.newMessage,
              });
            }
          })(g.regula),
        g.mailchimp.length)
      )
        for (_ = 0; _ < g.mailchimp.length; _++) {
          var B = $(g.mailchimp[_]),
            j = B.find('input[type="email"]');
          B.attr("novalidate", "true"),
            j.attr("name", "EMAIL"),
            B.on(
              "submit",
              $.proxy(
                function (t, a) {
                  a.preventDefault();
                  var e = this,
                    r = {},
                    i = e
                      .attr("action")
                      .replace("/post?", "/post-json?")
                      .concat("&c=?"),
                    o = e.serializeArray(),
                    n = $("#" + e.attr("data-form-output"));
                  for (_ = 0; _ < o.length; _++) r[o[_].name] = o[_].value;
                  return (
                    $.ajax({
                      data: r,
                      url: i,
                      dataType: "jsonp",
                      error: function (t, a) {
                        n.html("Server error: " + a),
                          setTimeout(function () {
                            n.removeClass("active");
                          }, 4e3);
                      },
                      success: function (a) {
                        n.html(a.msg).addClass("active"), (t[0].value = "");
                        var e = $('[for="' + t.attr("id") + '"]');
                        e.length && e.removeClass("focus not-empty"),
                          setTimeout(function () {
                            n.removeClass("active");
                          }, 6e3);
                      },
                      beforeSend: function (t) {
                        var a = window.xMode,
                          r = (function () {
                            var t,
                              a = 0,
                              r = e.find("[data-constraints]");
                            if (r.length) {
                              for (var i = 0; i < r.length; i++) {
                                var o = $(r[i]);
                                if ((t = o.regula("validate")).length)
                                  for (var n = 0; n < t.length; n++)
                                    a++,
                                      o
                                        .siblings(".form-validation")
                                        .text(t[n].message)
                                        .parent()
                                        .addClass("has-error");
                                else
                                  o.siblings(".form-validation")
                                    .text("")
                                    .parent()
                                    .removeClass("has-error");
                              }
                              return 0 === a;
                            }
                            return !0;
                          })();
                        if (a || !r) return !1;
                        n.html("Submitting...").addClass("active");
                      },
                    }),
                    !1
                  );
                },
                B,
                j
              )
            );
        }
      if (g.campaignMonitor.length)
        for (_ = 0; _ < g.campaignMonitor.length; _++) {
          var R = $(g.campaignMonitor[_]);
          R.on(
            "submit",
            $.proxy(function (t) {
              var a = {},
                e = this.attr("action"),
                r = this.serializeArray(),
                i = $("#" + g.campaignMonitor.attr("data-form-output")),
                o = $(this);
              for (l = 0; l < r.length; l++) a[r[l].name] = r[l].value;
              $.ajax({
                data: a,
                url: e,
                dataType: "jsonp",
                error: function (t, a) {
                  i.html("Server error: " + a),
                    setTimeout(function () {
                      i.removeClass("active");
                    }, 4e3);
                },
                success: function (t) {
                  i.html(t.Message).addClass("active"),
                    setTimeout(function () {
                      i.removeClass("active");
                    }, 6e3);
                },
                beforeSend: function (t) {
                  if (u || !b(o.find("[data-constraints]"))) return !1;
                  i.html("Submitting...").addClass("active");
                },
              });
              for (
                var n = o[0].getElementsByTagName("input"), l = 0;
                l < n.length;
                l++
              ) {
                n[l].value = "";
                var s = document.querySelector(
                  '[for="' + n[l].getAttribute("id") + '"]'
                );
                s && s.classList.remove("focus", "not-empty");
              }
              return !1;
            }, R)
          );
        }
      if (g.rdMailForm.length) {
        var U,
          _,
          V,
          H,
          Y,
          Q,
          W,
          J,
          K = {
            MF000: "Successfully sent!",
            MF001: "Recipients are not set!",
            MF002: "Form will not work locally!",
            MF003: "Please, define email field in your form!",
            MF004: "Please, define type of your form!",
            MF254: "Something went wrong with PHPMailer!",
            MF255: "Aw, snap! Something went wrong.",
          };
        for (_ = 0; _ < g.rdMailForm.length; _++) {
          var X = $(g.rdMailForm[_]),
            Z = !1;
          X.attr("novalidate", "novalidate").ajaxForm({
            data: {
              "form-type": X.attr("data-form-type") || "contact",
              counter: _,
            },
            beforeSubmit: function (t, a, e) {
              if (!u) {
                var r = $(g.rdMailForm[this.extraData.counter]),
                  i = r.find("[data-constraints]"),
                  o = $("#" + r.attr("data-form-output")),
                  n = r.find(".recaptcha"),
                  l = !0;
                if ((o.removeClass("active error success"), !b(i, n)))
                  return !1;
                if (n.length) {
                  var s = n.find(".g-recaptcha-response").val(),
                    d = {
                      CPT001:
                        'Please, setup you "site key" and "secret key" of reCaptcha',
                      CPT002: "Something wrong with google reCaptcha",
                    };
                  (Z = !0),
                    $.ajax({
                      method: "POST",
                      url: "bat/reCaptcha.php",
                      data: { "g-recaptcha-response": s },
                      async: !1,
                    }).done(function (t) {
                      "CPT000" !== t &&
                        (o.hasClass("snackbars")
                          ? (o.html(
                              '<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' +
                                d[t] +
                                "</span></p>"
                            ),
                            setTimeout(function () {
                              o.removeClass("active");
                            }, 3500),
                            (l = !1))
                          : o.html(d[t]),
                        o.addClass("active"));
                    });
                }
                if (!l) return !1;
                r.addClass("form-in-process"),
                  o.hasClass("snackbars") &&
                    (o.html(
                      '<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>'
                    ),
                    o.addClass("active"));
              }
            },
            error: function (t) {
              if (!u) {
                var a = $(
                    "#" +
                      $(g.rdMailForm[this.extraData.counter]).attr(
                        "data-form-output"
                      )
                  ),
                  e = $(g.rdMailForm[this.extraData.counter]);
                a.text(K[t]),
                  e.removeClass("form-in-process"),
                  Z && grecaptcha.reset();
              }
            },
            success: function (t) {
              if (!u) {
                var a = $(g.rdMailForm[this.extraData.counter]),
                  e = $("#" + a.attr("data-form-output")),
                  r = a.find("select");
                a.addClass("success").removeClass("form-in-process"),
                  Z && grecaptcha.reset(),
                  (t = 5 === t.length ? t : "MF255"),
                  e.text(K[t]),
                  "MF000" === t
                    ? e.hasClass("snackbars")
                      ? e.html(
                          '<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' +
                            K[t] +
                            "</span></p>"
                        )
                      : e.addClass("active success")
                    : e.hasClass("snackbars")
                    ? e.html(
                        ' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' +
                          K[t] +
                          "</span></p>"
                      )
                    : e.addClass("active error"),
                  a.clearForm(),
                  r.length && r.select2("val", ""),
                  a.find("input, textarea").trigger("blur"),
                  setTimeout(function () {
                    e.removeClass("active error success"),
                      a.removeClass("success");
                  }, 3500);
              }
            },
          });
        }
      }
      if (g.lightGallery.length)
        for (var _ = 0; _ < g.lightGallery.length; _++) w(g.lightGallery[_]);
      if (g.lightGalleryItem.length) {
        for (var tt = [], ta = 0; ta < g.lightGalleryItem.length; ta++)
          $(g.lightGalleryItem[ta]).parents(".owl-carousel").length ||
            $(g.lightGalleryItem[ta]).parents(".swiper-slider").length ||
            $(g.lightGalleryItem[ta]).parents(".slick-slider").length ||
            tt.push(g.lightGalleryItem[ta]);
        g.lightGalleryItem = tt;
        for (var _ = 0; _ < g.lightGalleryItem.length; _++)
          x(g.lightGalleryItem[_]);
      }
      if (g.lightDynamicGalleryItem.length)
        for (var _ = 0; _ < g.lightDynamicGalleryItem.length; _++)
          C(g.lightDynamicGalleryItem[_]);
      if (g.customToggle.length)
        for (var _ = 0; _ < g.customToggle.length; _++) {
          var te = $(g.customToggle[_]);
          te.on(
            "click",
            $.proxy(function (t) {
              t.preventDefault();
              var a = $(this);
              $(a.attr("data-custom-toggle")).add(this).toggleClass("active");
            }, te)
          ),
            "true" === te.attr("data-custom-toggle-hide-on-blur") &&
              l.on("click", te, function (t) {
                t.target !== t.data[0] &&
                  $(t.data.attr("data-custom-toggle")).find($(t.target))
                    .length &&
                  0 === t.data.find($(t.target)).length &&
                  $(t.data.attr("data-custom-toggle"))
                    .add(t.data[0])
                    .removeClass("active");
              }),
            "true" === te.attr("data-custom-toggle-disable-on-blur") &&
              l.on("click", te, function (t) {
                t.target !== t.data[0] &&
                  0 ===
                    $(t.data.attr("data-custom-toggle")).find($(t.target))
                      .length &&
                  0 === t.data.find($(t.target)).length &&
                  $(t.data.attr("data-custom-toggle"))
                    .add(t.data[0])
                    .removeClass("active");
              });
        }
      if (g.layoutToggle.length) {
        for (var _ = 0; _ < g.layoutToggle.length; _++)
          $(g.layoutToggle[_]).on("click", function () {
            sessionStorage.setItem(
              "pageLayoutBoxed",
              "true" !== sessionStorage.getItem("pageLayoutBoxed")
            ),
              n.toggleClass("boxed"),
              o.trigger("resize");
          });
        "true" === sessionStorage.getItem("pageLayoutBoxed") &&
          (g.layoutToggle.attr("checked", !0),
          n.addClass("boxed"),
          o.trigger("resize"));
        var tr = document.querySelectorAll("[data-theme-reset]");
        if (tr)
          for (var ta = 0; ta < tr.length; ta++)
            tr[ta].addEventListener("click", function () {
              sessionStorage.setItem("pageLayoutBoxed", !1),
                g.layoutToggle.attr("checked", !1),
                n.removeClass("boxed"),
                o.trigger("resize");
            });
      }
      if (g.selectFilter.length)
        for (_ = 0; _ < g.selectFilter.length; _++) {
          var ti = $(g.selectFilter[_]),
            to = "html-" + ti.attr("data-style") + "-select";
          n.addClass(to),
            ti.select2({
              placeholder:
                !!ti.attr("data-placeholder") && ti.attr("data-placeholder"),
              minimumResultsForSearch: ti.attr("data-minimum-results-search")
                ? ti.attr("data-minimum-results-search")
                : -1,
              maximumSelectionSize: 3,
            });
        }
      g.stepper.length && g.stepper.stepper({ labels: { up: "", down: "" } }),
        g.multitoggle.length && multitoggles();
      for (var _ = 0; _ < g.hoverEls.length; _++) {
        var tn = g.hoverEls[_];
        tn.addEventListener("mouseenter", function (t) {
          for (
            var a = t.target.getAttribute("data-hover-group"),
              e = document.querySelectorAll('[data-hover-group="' + a + '"]'),
              r = 0;
            r < e.length;
            r++
          )
            e[r].classList.add("active");
        }),
          tn.addEventListener("mouseleave", function (t) {
            for (
              var a = t.target.getAttribute("data-hover-group"),
                e = document.querySelectorAll('[data-hover-group="' + a + '"]'),
                r = 0;
              r < e.length;
              r++
            )
              e[r].classList.remove("active");
          });
      }
      if (!u && (g.mfp.length || g.mfpGallery.length)) {
        if (g.mfp.length)
          for (var _ = 0; _ < g.mfp.length; _++) {
            var tl = g.mfp[_];
            $(tl).magnificPopup({ type: tl.getAttribute("data-lightbox") });
          }
        if (g.mfpGallery.length)
          for (var _ = 0; _ < g.mfpGallery.length; _++) {
            for (
              var ts = $(g.mfpGallery[_]).find("[data-lightbox]"), T = 0;
              T < ts.length;
              T++
            )
              $(ts).addClass("mfp-" + $(ts).attr("data-lightbox"));
            ts.end().magnificPopup({
              delegate: "[data-lightbox]",
              type: "image",
              gallery: { enabled: !0 },
            });
          }
      }
      if (g.countdown.length)
        for (var _ = 0; _ < g.countdown.length; _++) {
          var td = g.countdown[_];
          aCountdown({
            node: td,
            from: td.getAttribute("data-from"),
            to: td.getAttribute("data-to"),
            count: td.getAttribute("data-count"),
            tick: 100,
          });
        }
    }),
    $(document).ready(function () {
      g.switcher.length &&
        $.rdstyleswitcher({
          schemes: [
            { id: "Scheme 1", icon: "#000000" },
            { id: "Scheme 2", url: "css/style-1.css", icon: "#ffffff" },
          ],
        });
    });
})();
let kitchens = document.querySelectorAll(".kitchen .image");
kitchens.forEach((e) => {
  e.addEventListener("click", function () {
    e.parentNode.querySelector(".data").classList.toggle("hide");
  });
});
let exits = document.querySelectorAll(".exit");
exits.forEach((e) => {
  e.addEventListener("click", function () {
    e.parentNode.classList.add("hide");
  });
});
