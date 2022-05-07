class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupTowers();
  }

  setupTowers() {
    const $ul1 = $("<ul>");
    const $ul2 = $("<ul>");
    const $ul3 = $("<ul>");

    for (let i = 0; i < 3; i++) {
      let $li = $("<li>")
      $li.data("pos", [0, i]);

      $ul1.append($li);
    }

    this.$el.append($ul1, $ul2, $ul3)
  }
}

module.exports = View;