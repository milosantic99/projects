namespace Bertus_Igrannonica.Enums
{

    public enum ActivationType
    {
        reLU,
        tanh,
        sigmoid,
        linear,
        softmax
    }

    public enum OptimizerType
    {
        Adam,
        SGD
    }

    public enum RegularizationType
    {
        none,
        L1,
        L2
    }

    public enum LossType
    {
        Binarycross,
        Categoricalcross,
        Mse
    }

    public enum ProblemType
    {
        classification,
        regression
    }

    public enum OutlierType
    {
        none,
        Svm,
        MinCovDet,
        LocOutFact,
        IsolationForest
    }

    public enum EncodeType
    {
        OneHotEncoding,
        LabelEncoding
    }
    public enum ReplaceNumber
    {
        Delete,
        Minimum,
        Maximum,
        Average,
        Median
    }

    public enum ReplaceCat
    {
        Delete,
        MostCommonValue,
        TheRarestValue,
    }

    public enum ReplaceMissing
    {
        Delete,
        Minimum,
        Maximum,
        Average,
        Median,
        MostCommonValue,
        TheRarestValue
    }

    public enum DataCleaning
    {
        Normalizer,
        Scaler
    }


    public enum DataType
    {
        Numeric,
        Categorical
    }
}

