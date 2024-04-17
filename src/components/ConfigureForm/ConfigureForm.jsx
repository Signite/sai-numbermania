/* eslint-disable react/prop-types */
import './configureForm.css';

const ConfigureForm = ({ options, setOptions, back }) => {
    return (
        <div className='configure-form'>
            <h2>Настройки</h2>
            <div className="row-elements">
                <h3>Максимальное число</h3>
                <input type="number"
                    min={3}
                    value={options.maxNumber}
                    onChange={(e) => setOptions((prev) => { return { ...prev, maxNumber: Number(e.target.value) } })}
                />
            </div>
            <div className="col-elements">
                <h3>Доступные операции</h3>
                <div className="row-elements">
                    <input type="checkbox"
                        checked={options.enablePlus}
                        onChange={(e) => setOptions((prev) => { return { ...prev, enablePlus: e.target.checked } })}
                    />
                    <h4>+</h4>
                </div>
                <div className="row-elements">

                    <input type="checkbox"
                        checked={options.enableMinus}
                        onChange={(e) => setOptions((prev) => { return { ...prev, enableMinus: e.target.checked } })}
                    />
                    <h4>-</h4>
                </div>
            </div>
            <div className="row-elements">
                <h3>Простой режим</h3>
                <input type="checkbox"
                    checked={options.easy}
                    onChange={(e) => setOptions((prev) => { return { ...prev, easy: e.target.checked } })}
                />
            </div>
            <div className="row-elements">
                <h3>Прогрессивная сложность</h3>
                <input type="checkbox"
                    checked={options.progressiveDiаficulty}
                    onChange={(e) => setOptions((prev) => { return { ...prev, progressiveDiаficulty: e.target.checked } })}
                />
            </div>
            <button onClick={back}>Сохранить</button>
        </div>
    )
}

export default ConfigureForm;