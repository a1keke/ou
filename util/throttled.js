
    module.exports = (func, wait)=>{
        let timeout, context, args, result;
        let previous = 0;

        let later = function() {
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };

        let throttled = function() {
            let now = new Date;
            let remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout ) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    }