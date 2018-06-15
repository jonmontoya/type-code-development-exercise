/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import actions from '../redux/actions';

const { updateTitle } = actions;

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  titleText: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  titleSlug: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);

    const {
      titleSlug,
      titleText,
    } = props;

    this.state = {
      edit: false,
      updating: false,
      titleSlug,
      titleText,
      wordStyles: {},
    };

    this.words = {};

    this.handleSave = this.handleSave.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.styleWordBackgrounds = this.styleWordBackgrounds.bind(this);
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(this.styleWordBackgrounds);
    this.resizeObserver.observe(this.title);
    this.resizeObserver.observe(document.body); // eslint-disable-line no-undef

    this.styleWordBackgrounds();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      titleText,
      titleSlug,
    } = this.props;
    const {
      titleText: prevTitleText,
      titleSlug: prevTitleSlug,
    } = prevProps;
    const {
      edit,
      updating,
      titleText: stateTitleText,
    } = this.state;

    const {
      titleText: prevStateTitleText,
      updating: prevStateUpdating,
    } = prevState;

    if (
      stateTitleText !== prevStateTitleText ||
      (updating !== prevStateUpdating && !updating)
    ) {
      this.styleWordBackgrounds();
    }

    if (!edit && !updating) {
      if (titleText !== prevTitleText || titleSlug !== prevTitleSlug) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          titleText,
          titleSlug,
        });
      }
    }
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect(this.title);
    this.resizeObserver.disconnect(document.body); // eslint-disable-line no-undef
  }

  styleWordBackgrounds() {
    const {
      edit,
      titleText,
    } = this.state;

    if (edit) return;

    const wordStyles = {};

    const words = titleText.split(' ');

    words.forEach((key) => {
      const el = this.words[key];
      if (!el) return;

      const {
        width,
        height,
        top,
        left,
      } = el.getBoundingClientRect();

      // eslint-disable-next-line no-undef
      const scrollOffset = document.body.scrollTop;
      const backgroundPositionLeft = left;
      const backgroundPositionTop = top + scrollOffset + 5;

      wordStyles[key] = {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top + scrollOffset}px`,
        left: `${left}px`,
        backgroundPosition: `-${backgroundPositionLeft}px -${backgroundPositionTop}px`,
      };
    });

    this.setState({ wordStyles });
  }

  async handleSave(e) {
    const { dispatch } = this.props;
    const {
      titleText,
      titleSlug,
    } = this.state;

    e.preventDefault();

    this.setState({
      edit: false,
      updating: true,
    }, async () => {
      await dispatch(updateTitle(titleText, titleSlug));
      this.setState({ updating: false });
    });
  }

  handleDiscard(e) {
    e.preventDefault();
    this.setState({ edit: false });
  }

  handleChange(e) {
    const { value: titleText } = e.target;

    // create slug from title
    const titleSlug = titleText
      .toLowerCase() // convert to lower case
      .trim() // trim beginning and ending whitespace
      .replace(/\s+|-+/g, '-') // replace all groups of whitespace characters with a dash
      .replace(/[^a-z-]|^-|-$/g, ''); // remove all characters that are not lowercase letters or spaces, remove beginning and ending dashes

    this.setState({
      titleText,
      titleSlug,
    });
  }

  validateTitle() {
    const { titleText } = this.state;
    const { titleText: propsTitleText } = this.props;

    const isModified = propsTitleText !== titleText;
    const hasLength = !!titleText.trim().length;

    return hasLength && isModified;
  }

  renderEdit() {
    const {
      titleText,
      titleSlug,
    } = this.state;

    return (
      <form
        className="editable-title-form"
        onSubmit={this.handleSave}
      >
        <input
          className="editable-title-button save"
          type="submit"
          disabled={!this.validateTitle()}
        />
        <button
          className="editable-title-button discard"
          onClick={this.handleDiscard}
          aria-label="Discard Changes"
        />
        <fieldset
          className="editable-title-fields"
        >
          <label
            htmlFor="titleText"
            className="editable-title-title-field"
          >
            <input
              className="editable-title-title-input"
              id="titleText"
              value={titleText}
              onChange={this.handleChange}
              type="text"
              autoFocus
            />
          </label>
          <label
            htmlFor="titleSlug"
            className="editable-title-slug-field"
          >
            slug:
            <input
              className="editable-title-slug-input"
              id="titleSlug"
              value={titleSlug}
              type="text"
              placeholder="please enter a post title"
              readOnly
            />
          </label>
        </fieldset>
      </form>
    );
  }

  renderDisplayWords() {
    const {
      titleText,
    } = this.state;

    return titleText.split(' ').map((word, idx) => (
      <div
        ref={(el) => { this.words[word] = el; }}
        key={`${word}-${idx}`}
        className="editable-title-word"
      >
        {`${word}`}
      </div>
    ));
  }

  renderDisplayWordBackgrounds() {
    const {
      wordStyles,
      titleText,
    } = this.state;

    return titleText.split(' ').map((word, idx) => (
      <div
        key={`${word}-${idx}`}
        className="editable-title-word-background"
        style={wordStyles[word] ? wordStyles[word] : { display: 'none' }}
      />
    ));
  }

  renderDisplay() {
    return (
      <div className="editable-title">
        <button
          className="editable-title-button edit"
          onClick={() => this.setState({ edit: true })}
          aria-label="Edit Title"
        />
        <div
          ref={(el) => { this.title = el; }}
          className="editable-title-title"
        >
          { this.renderDisplayWords() }
        </div>
      </div>
    );
  }

  render() {
    const {
      edit,
      updating,
    } = this.state;

    return (
      <div
        className="editable-title-wrapper"
      >
        { edit || updating ? this.renderEdit() : this.renderDisplay() }
        { edit || updating ? null : this.renderDisplayWordBackgrounds() }
      </div>
    );
  }
}

EditableTitle.propTypes = propTypes;

const mapStateToProps = ({ title }) => ({
  titleText: title.text,
  titleSlug: title.slug,
});

export default connect(mapStateToProps)(EditableTitle);
