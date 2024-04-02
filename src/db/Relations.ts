import { ModelStatic, Model } from 'sequelize';

export class Relations {
  public static oneIn(One: ModelStatic<Model>, In: ModelStatic<Model>): void {
    In.belongsTo(One);
    One.hasMany(In);
  }

  public static manyToMany(
    First: ModelStatic<Model>,
    Second: ModelStatic<Model>,
    through: string
  ): void {
    First.belongsToMany(Second, { through, timestamps: false });
    Second.belongsToMany(First, { through, timestamps: false });
  }
}
