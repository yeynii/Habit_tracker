import HabitPresenter from '../habit_presenter';

describe('Habitpresenter', () =>{
    let presenter;
    let update;
    const habits = [
        { id: 1, name: "Reading", count: 1 },
        { id: 2, name: "Running", count: 0 }
      ];

    beforeEach(() => {
        presenter = new HabitPresenter(habits, 3);
        update = jest.fn();
    });

    it('habits 초기값 확인', () => {
        expect(presenter.getHabits()).toStrictEqual(habits);
    });

    it('increment: habit count를 증가', () => {
        presenter.increment(habits[0], update);

        expect(presenter.getHabits()[0].count).toBe(2);
        checkUpdateIsCalled();
    });
    describe('decrement:', () => {
        it('habit count를 감소', () => {
            presenter.decrement(habits[0], update);
    
            expect(presenter.getHabits()[0].count).toBe(0);
            checkUpdateIsCalled();
        });
    
        it('count를 0 아래로 감소시키지 않음', () => {
            presenter.decrement(habits[0], update);
            presenter.decrement(habits[0], update);
    
            expect(presenter.getHabits()[0].count).toBe(0);
        });
    })

    it('delete: habit을 삭제', () => {
        presenter.delete(habits[0], update);
        expect(presenter.getHabits()[0].name).toBe('Running');
        checkUpdateIsCalled();
    });
    
    describe('add:',() => {
        it('habit을 추가', () => {
            presenter.add("비타민 먹기", update);
            expect(presenter.getHabits()[2].name).toBe('비타민 먹기');
            expect(presenter.getHabits()[2].count).toBe(0);
            checkUpdateIsCalled();
        });
    
        it('habit의 개수는 max habits limit을 넘을 수 없음', () => {
            presenter.add("비타민 먹기", update);
            expect(() => presenter.add("비타민 먹기", update)).toThrow('습관의 갯수는 3개를 넘을 수 없습니다');
        });

    });

    describe('reset:', () => {
        it('모든 count를 0으로 초기화', () =>{
            presenter.reset(update);
            expect(presenter.getHabits()[0].count).toBe(0);
            expect(presenter.getHabits()[1].count).toBe(0);
            checkUpdateIsCalled();
        });
    
        it('기존 count가 0 이면 새 object를 만들지 않음', () => {
            const habits = presenter.getHabits();
            presenter.reset(update);
            const updateHabits = presenter.getHabits();
    
            expect(updateHabits[1]).toBe(habits[1]);
        });
    });

    function checkUpdateIsCalled() {
        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toBeCalledWith(presenter.getHabits());
    }
})