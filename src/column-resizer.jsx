

import React from 'react';
import { bool, number, string } from 'prop-types';

export default class ColumnResizer extends React.Component {

    constructor(props) {
        super(props);

        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.dragging = false;
        this.mouseX = 0
        this.startPos = 0;
        this.startWidthPrev = 0;
    }

    startDrag() {
        if (this.props.disabled) {
            return;
        }

        this.dragging = true;
        this.startPos = this.mouseX;

        this.startWidthPrev = 0;       

        if (this.refs.ele) {
            let prevSibling = this.refs.ele.previousSibling;

            if (prevSibling) {
                this.startWidthPrev = prevSibling.clientWidth;
            }
        }
    }

    endDrag() {
        if (this.props.disabled) {
            return;
        }
        this.dragging = false;
    }

    onMouseMove(e) {
        if (this.props.disabled) {
            return;
        }

        this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;
        if (!this.dragging) {
            return;
        }

        const ele = this.refs.ele;

        const moveDiff = this.startPos - this.mouseX;
        let newPrev = this.startWidthPrev - moveDiff;

        if(!this.props.minWidth || newPrev >= this.props.minWidth) {
            ele.previousSibling.style.width = newPrev + 'px';
            ele.previousSibling.style.minWidth = newPrev + 'px';
            ele.previousSibling.style.maxWidth = newPrev + 'px';
        }
        
    }

    componentDidMount() {
        if (this.props.disabled) {
            return;
        }
        const ele = this.refs.ele;
        if(this.props.minWidth && ele) {
            ele.previousSibling.style.minWidth = this.props.minWidth + 'px';
        }
        this.addEventListenersToDocument();
    }

    componentWillUnmount() {
        if (this.props.disabled) {
            return;
        }

        this.removeEventListenersFromDocument();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.disabled && !this.props.disabled) {
            this.addEventListenersToDocument();
        }

        if (!prevProps.disabled && this.props.disabled) {
            this.removeEventListenersFromDocument();
        }
    }

    addEventListenersToDocument() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.endDrag);

        document.addEventListener("touchmove", this.onMouseMove);
        document.addEventListener("touchend", this.endDrag);
    }

    removeEventListenersFromDocument() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.endDrag);

        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.endDrag);
    }

    render() {

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

        return (
            <td ref="ele" 
                style={style}
                className={this.props.className}
                onMouseDown={!this.props.disabled && this.startDrag}
                onTouchStart={!this.props.disabled && this.startDrag}
            />
        );
    }

}

ColumnResizer.defaultProps = {
    disabled: false,
    minWidth: 0,
    className: "",
}

ColumnResizer.propTypes = {
    disabled: bool,
    minWidth: number,
    className: string,
}
