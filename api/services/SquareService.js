// SquareService.js - in api/services
module.exports = {

    getSquareData: function(snam) {

        Square.findOne({ sname : snam}).then(function (square) {
            // console.log(square);
            return square;
        }).catch(function(err){
            console.log(err);
            return null;
        });
    }
};