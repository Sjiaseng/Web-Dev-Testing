module.exports = (req, res) => {
    const{
        temperature,
        unit
    } = req.body;

    let result;
    
    if(unit === 'celcius'){
        result = (parseFloat(temperature) * 9 / 5) + 32;
    }else if (unit === 'fahrenheit'){
        result = (parseFloat(temperature) - 32) * 5 / 9;
    }

    res.render('temperature', {
        result
    });
};

