interface IBusinessRules {
    rules: IRuleDescription[];
}

interface IRuleDescription {
    rule: string;
    comment: string;
}

class BusinessRules implements IBusinessRules {
    public rules: IRuleDescription[] = [{ rule: '', comment: '' }];
    constructor (rules: IRuleDescription[]) {
        this.rules = rules;
    }
    addRule ({ rule , comment }: IRuleDescription) {
        const updatedRules = new BusinessRules([...this.rules, { rule, comment }]);
        updatedRules.rules.map(({ rule }) => this.ruleIdIsPresent(rule))
        return updatedRules;
    }
    ruleIdIsPresent (rule: string) {
        const ruleId = rule.slice(0, 2);
        if (
            !ruleId.includes('#') &&
            !!Number(ruleId.at(0))
        ) {
            throw new Error(`Rule "${rule}" doesn't have an id in the beginning`);
        }
        return true;
    }
}

const rules = new BusinessRules([{ rule: '#1 X buys Y', comment: '' }])
        .addRule({ rule: '#2 taxes are 13%', comment: '' })
        .addRule({ rule: '#3 and more…', comment: '' });

console.log(rules);

// How can we refactor it and make simpler to read and understand, keeping immutability and all the logic inside ?
// What we need:
// 1. Rules must be provided with comments somehow
// 2. When we add something it always is about new object
// 3. If rules are not marked with ids - its error
// 4. Somehow rules must be marked with ids
