"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = require("prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ColumnResizer = /*#__PURE__*/function (_React$Component) {
  _inherits(ColumnResizer, _React$Component);
  var _super = _createSuper(ColumnResizer);
  function ColumnResizer(props) {
    var _this;
    _classCallCheck(this, ColumnResizer);
    _this = _super.call(this, props);
    _this.startDrag = _this.startDrag.bind(_assertThisInitialized(_this));
    _this.endDrag = _this.endDrag.bind(_assertThisInitialized(_this));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.dragging = false;
    _this.mouseX = 0;
    _this.startPos = 0;
    _this.startWidthPrev = 0;
    return _this;
  }
  _createClass(ColumnResizer, [{
    key: "startDrag",
    value: function startDrag() {
      if (this.props.disabled) {
        return;
      }
      this.dragging = true;
      this.startPos = this.mouseX;
      this.startWidthPrev = 0;
      if (this.refs.ele) {
        var prevSibling = this.refs.ele.previousSibling;
        if (prevSibling) {
          this.startWidthPrev = prevSibling.clientWidth;
        }
      }
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      if (this.props.disabled) {
        return;
      }
      this.dragging = false;
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (this.props.disabled) {
        return;
      }
      this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;
      if (!this.dragging) {
        return;
      }
      var ele = this.refs.ele;
      var moveDiff = this.startPos - this.mouseX;
      var newPrev = this.startWidthPrev - moveDiff;
      if (!this.props.minWidth || newPrev >= this.props.minWidth) {
        ele.previousSibling.style.width = newPrev + 'px';
        ele.previousSibling.style.minWidth = newPrev + 'px';
        ele.previousSibling.style.maxWidth = newPrev + 'px';
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.disabled) {
        return;
      }
      var ele = this.refs.ele;
      if (this.props.minWidth && ele) {
        ele.previousSibling.style.minWidth = this.props.minWidth + 'px';
      }
      this.addEventListenersToDocument();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.disabled) {
        return;
      }
      this.removeEventListenersFromDocument();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.disabled && !this.props.disabled) {
        this.addEventListenersToDocument();
      }
      if (!prevProps.disabled && this.props.disabled) {
        this.removeEventListenersFromDocument();
      }
    }
  }, {
    key: "addEventListenersToDocument",
    value: function addEventListenersToDocument() {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener("touchmove", this.onMouseMove);
      document.addEventListener("touchend", this.endDrag);
    }
  }, {
    key: "removeEventListenersFromDocument",
    value: function removeEventListenersFromDocument() {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.onMouseMove);
      document.removeEventListener('touchend', this.endDrag);
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        userSelect: "none"
      };
      if (!this.props.disabled) {
        style.cursor = 'ew-resize';
      }
      if (this.props.className === "") {
        style.width = '6px';
        style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      }
      return /*#__PURE__*/_react["default"].createElement("td", {
        ref: "ele",
        style: style,
        className: this.props.className,
        onMouseDown: !this.props.disabled && this.startDrag,
        onTouchStart: !this.props.disabled && this.startDrag
      });
    }
  }]);
  return ColumnResizer;
}(_react["default"].Component);
exports["default"] = ColumnResizer;
ColumnResizer.defaultProps = {
  disabled: false,
  minWidth: 0,
  className: ""
};
ColumnResizer.propTypes = {
  disabled: _propTypes.bool,
  minWidth: _propTypes.number,
  className: _propTypes.string
};