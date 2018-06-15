/* eslint-disable max-len */
import React from 'react'; // eslint-disable-line no-unused-vars
import EditableTitle from '../../components/EditableTitle';

const Article = () => (
  <article className="article">
    <div className="article-header" />
    <EditableTitle />
    <section className="article-info">
      <div className="article-info-item article-author">
        <span className="article-author-by">BY</span>
        <span className="article-author-name">Bob Loblaw</span>
      </div>
      <div className="article-info-item article-date">AUGUST 6, 2015</div>
      <ul className="article-info-item article-tags">
        <li className="article-tag">#ENVIRONMENT</li>
        <li className="article-tag">#SWIFT</li>
        <li className="article-tag">#FUNGUS</li>
      </ul>
    </section>
    <section className="article-text">
      <p><span className="location">NEW YORK , NY.</span> Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia     scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.</p>

      <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim.</p>

      <aside className="pull-quote">
        <blockquote>Looking at it now, last December. We were built to fall apart. Then fall back together.</blockquote>
      </aside>

      <p>Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt.</p>

      <p>Nam vestibulum, arcu sodales feugiat consectetur, nisl orci bibendum elit, eu euismod magna sapien ut nibh. Donec semper quam scelerisque tortor. Mauris vel neque sit amet nunc gravida congue.</p>
    </section>
  </article>
);

export default Article;
