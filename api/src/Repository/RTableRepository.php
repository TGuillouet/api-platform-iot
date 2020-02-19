<?php

namespace App\Repository;

use App\Entity\RTable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method RTable|null find($id, $lockMode = null, $lockVersion = null)
 * @method RTable|null findOneBy(array $criteria, array $orderBy = null)
 * @method RTable[]    findAll()
 * @method RTable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RTable::class);
    }

    // /**
    //  * @return RTable[] Returns an array of RTable objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RTable
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
